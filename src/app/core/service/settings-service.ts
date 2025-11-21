import { inject, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { TranslateService } from './translate-service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private translate: TranslateService = inject(TranslateService);
  private cookieName = 'app_settings';
  private expiryDays = 30;
  private previousTheme = 'theme-flora';

  darkMode: WritableSignal<boolean> = signal(false);
  language: WritableSignal<string> = signal('es');
  theme: WritableSignal<string> = signal('theme-flora');
  rememberMe: WritableSignal<boolean> = signal(false);

  bodyClassList = document.body.classList;

  constructor() {
    this.loadSettings();
  }

  private setCookie(name: string, value: string, days: number) {
    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    document.cookie = `${name}=${encodeURIComponent(
      value
    )};expires=${expires.toUTCString()};path=/;`;
    this.loadSettings();
  }

  private getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }

  loadSettings() {
    const cookie = this.getCookie(this.cookieName);
    if (cookie) {
      try {
        const settings = JSON.parse(cookie);
        
        this.darkMode.set(settings.darkMode ?? false);
        this.language.set(settings.language ?? 'es');
        this.rememberMe.set(settings.rememberMe ?? false);
        this.translate.setLanguage(this.language());

        if (this.darkMode()) {
          this.bodyClassList.add('dark-theme');
        } else {
          this.bodyClassList.remove('dark-theme');
        }

        if (this.theme() != this.previousTheme) {
          this.bodyClassList.remove(this.previousTheme);
          this.previousTheme = this.theme();
          this.theme.set(settings.theme ?? 'theme-flora');
          this.bodyClassList.add(this.theme());
        }
      } catch (e) {
        console.warn('Error al parsear cookie de configuración', e);
      }
    }
  }

  toggleDarkMode() {
    this.darkMode.update((value) => !value);
    this.saveSettings();
  }

  setRememberMe(value: boolean) {
    this.rememberMe.set(value);
    this.saveSettings();
  }

  setLanguageCookie(lang: string) {
    this.language.update((value) =>
      lang === 'en' || lang === 'es' || lang === 'de' ? lang : value
    );
    this.translate.setLanguage(this.language());
    this.saveSettings();
  }

  saveSettings() {
    const data = {
      darkMode: this.darkMode(),
      language: this.language(),
      theme: this.theme(),
      rememberMe: this.rememberMe()
    };
    this.setCookie(this.cookieName, JSON.stringify(data), this.expiryDays);
  }
}
