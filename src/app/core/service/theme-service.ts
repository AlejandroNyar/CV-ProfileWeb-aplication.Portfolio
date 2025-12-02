import { afterRenderEffect, effect, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Cookie } from './cookie';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private dark = signal(false);
  private cookieService: Cookie = inject(Cookie);
  private initialized = false;

  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor() {
    afterRenderEffect(() => {
      this.applyThemeClass(this.isDark());
    });

    effect(() => {
      if (!this.isBrowser || !this.initialized) return;

      const value = this.dark();
      const cookie = this.cookieService.getCookie('settings');

      let parsed: any = {};
      try {
        parsed = cookie ? JSON.parse(cookie) : {};
      } catch {}

      // ❗ Solo actualizar si cambió
      if (parsed.darkTheme !== value) {
        this.cookieService.updateCookie('darkTheme', value);
      }
    });
  }

  private applyThemeClass(isDarkMode: boolean) {
    if (!this.isBrowser) return;
    document.body.classList.toggle('dark-theme', isDarkMode);
  }

  async initialize(): Promise<void> {
    const theme = this.detectTheme();
    this.dark.set(theme);
    this.initialized = true;
  }

  private detectTheme(): boolean {
    if (!this.isBrowser) return false;

    const cookie = this.cookieService.getCookie();
    if (cookie) {
      try {
        const parsed = JSON.parse(cookie);
        if (typeof parsed.darkTheme === 'boolean') {
          return parsed.darkTheme;
        }
      } catch {}
    }
    const browserTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return browserTheme;
  }

  isDark() {
    return this.dark();
  }

  toggle() {
    this.dark.update((x) => !x);
  }
}
