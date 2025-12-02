import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { Cookie } from './cookie';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private dark = signal(false);
  private cookieService: Cookie = inject(Cookie);
  private cookieName: string = 'app_settings';
  
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  async initialize(): Promise<void> {
    const lang = this.detectTheme();
    await this.loadTheme(lang);
  }

  private detectTheme(): boolean {
    if (!this.isBrowser) return false;

    const cookie = this.cookieService.getCookie(this.cookieName);
    if (cookie) {
      try {
        const parsed = JSON.parse(cookie);
        if (parsed.dark) return parsed.dark;
      } catch {}
    }
    const browserTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    return browserTheme;
  }

  private async loadTheme(lang: boolean): Promise<void> {
    try {
      this.dark.set(lang);
      console.log("theme: ", lang.toString())
      if (this.isBrowser) this.cookieService.updateCookie(this.cookieName, lang.toString());
    } catch (e) {
      console.error('Error crítico cargando tema:', e);
    }
  }

  isDark() {
    return this.dark();
  }

  toggle() {
    this.dark.update((x) => !x);
    console.log("toggle", this.dark())
    document.body.classList.toggle('dark-theme', this.dark());
  }
}
