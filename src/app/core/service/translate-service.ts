import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { firstValueFrom, of, catchError } from 'rxjs';
import { supportedLangs } from '../model/suportedLanguage';
import { Cookie } from './cookie';

@Injectable({ providedIn: 'root' })
export class TranslateService {

  private http = inject(HttpClient);
  private cookieService = inject(Cookie);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private initialized = false;

  private translations = signal<Record<string, any>>({});
  public currentLang = signal<string>('es');

  private supported: supportedLangs[] = [
    { in: 'en', lang: 'English', svg: 'img/i18n/Great Britain.svg' },
    { in: 'es', lang: 'Español', svg: 'img/i18n/Spain 2.svg' },
    { in: 'de', lang: 'Deutsch', svg: 'img/i18n/Germany.svg' },
  ];

  async initialize(): Promise<void> {
    if (!this.isBrowser || this.initialized) return;

    const lang = this.detectLanguage();
    await this.loadTranslations(lang);
    this.initialized = true;
  }

  private detectLanguage(): string {
    if (!this.isBrowser) return 'es';

    const cookie = this.cookieService.getCookie();

    if (cookie) {
      try {
        const parsed = JSON.parse(cookie);
        if (parsed.language && this.isSupported(parsed.language)) {
          return parsed.language;
        }
      } catch {}
    }

    const browserLang = navigator.language.split('-')[0];
    if (this.isSupported(browserLang)) return browserLang;

    return 'en';
  }

  private async loadTranslations(lang: string): Promise<void> {
    try {
      const data = await firstValueFrom(
        this.http.get<Record<string, any>>(`i18n/${lang}.json`).pipe(
          catchError(err => {
            console.error(`Error cargando ${lang}.json`, err);
            return of({});
          })
        )
      );

      this.translations.set(data || {});
      this.currentLang.set(lang);
      const existing = this.cookieService.getCookie();
      let parsed: any = {};

      try {
        parsed = existing ? JSON.parse(existing) : {};
      } catch {}

      if (parsed.language !== lang) {
        this.cookieService.updateCookie("language", lang);
      }

    } catch (e) {
      console.error('Error crítico cargando traducciones:', e);
    }
  }

  t(key: string) {
    return computed(() => {
      const dict = this.translations();
      return this.getNestedValue(dict, key) ?? key;
    });
  }

  async setLanguage(lang: string): Promise<void> {
    if (!this.initialized) return;
    if (!this.isSupported(lang)) return;
    if (lang === this.currentLang()) return;

    await this.loadTranslations(lang);
  }

  getLanguage(): string {
    return this.currentLang();
  }

  getSupportedLanguages() {
    return this.supported;
  }

  private isSupported(code: string): boolean {
    return this.supported.some(l => l.in === code);
  }

  private getNestedValue(obj: Record<string, any>, path: string) {
    return path.split('.').reduce((acc: any, key) => acc?.[key], obj);
  }
}
