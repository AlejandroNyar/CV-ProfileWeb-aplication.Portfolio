import { Injectable, signal, computed, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, of, firstValueFrom } from 'rxjs';
import { supportedLangs } from '../model/suportedLanguage';

@Injectable({ providedIn: 'root' })
export class TranslateService {
  private translations = signal<Record<string, any>>({});
  private currentLang = signal<string>('es');
  private supportedLangs: supportedLangs[] = [
    { in: 'en', lang: 'English', svg: 'img/i18n/Great Britain.svg' },
    { in: 'es', lang: 'Español', svg: 'img/i18n/Spain 2.svg' },
    { in: 'de', lang: 'Deutsch', svg: 'img/i18n/Germany.svg' },
  ];

  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private initialized = signal(false);

  constructor() {}

  async ensureInit(): Promise<void> {
    if (this.initialized()) return;
    this.initialized.set(true);

    let lang = 'en';
    if (this.isBrowser) {
      const cookie = this.getCookie('app_settings');
      if (cookie) {
        try {
          const parsed = JSON.parse(cookie);
          if (parsed.language && this.supportedLangs.includes(parsed.language))
            lang = parsed.language;
        } catch (error) {
          console.error(error);
        }
      } else {
        const browserLang = (navigator.language || 'en').split('-')[0];
        lang = this.supportedLangs.some((element) => (element.in = browserLang))
          ? browserLang
          : 'en';
      }
    }

    if (this.isBrowser) {
      try {
        const data = await firstValueFrom(
          this.http.get<Record<string, any>>(`assets/i18n/${lang}.json`).pipe(
            catchError((e) => {
              console.error(e);
              return of({});
            })
          )
        );
        this.translations.set(data || {});
        this.currentLang.set(lang);
        this.updateCookie(lang);
      } catch (e) {
        console.error('TranslateService load error', e);
      }
    } else {
      this.translations.set({});
      this.currentLang.set('es');
    }
  }

  t(key: string) {
    if (!this.initialized()) void this.ensureInit();
    return computed(() => {
      const dict = this.translations();
      const value = this.getNestedValue(dict, key);
      return value ?? key;
    });
  }

  private initLanguage(): void {
    let langToUse: string | undefined;

    if (this.isBrowser) {
      const cookieValue = this.getCookie('app_settings');

      if (cookieValue) {
        try {
          const parsed = JSON.parse(cookieValue);
          if (parsed.language && this.supportedLangs.includes(parsed.language)) {
            langToUse = parsed.language;
          }
        } catch (error) {
          console.warn('Cookie app_settings inválida:', error);
        }
      }
    }

    if (!langToUse && this.isBrowser) {
      const browserLang = navigator.language.split('-')[0];
      langToUse = this.supportedLangs.some((element) => (element.in = browserLang))
        ? browserLang
        : 'en';
    }

    if (!langToUse) langToUse = 'en';

    this.loadTranslations(langToUse);
  }

  private loadTranslations(lang: string): void {
    this.http
      .get<Record<string, any>>(`assets/i18n/${lang}.json`)
      .pipe(
        tap((data) => {
          this.translations.set(data || {});
          this.currentLang.set(lang);

          if (this.isBrowser) {
            this.updateCookie(lang);
          }
        }),
        catchError((error) => {
          console.error(`Error loading translations for ${lang}:`, error);
          return of({});
        })
      )
      .subscribe();
  }

  setLanguage(lang: string): void {
    if (lang !== this.currentLang() && this.supportedLangs.some((element) => (element.in = lang))) {
      this.loadTranslations(lang);
    }
  }

  getLanguage(): string {
    return this.currentLang();
  }

  getSupportedLanguages(): supportedLangs[] {
    return this.supportedLangs;
  }

  private getNestedValue(obj: Record<string, any>, path: string): any {
    return path.split('.').reduce((acc: any, key) => (acc ? acc[key] : undefined), obj);
  }

  private getCookie(name: string): string | null {
    if (!this.isBrowser) return null;

    const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
  }

  private updateCookie(language: string): void {
    if (!this.isBrowser) return;

    let settings: Record<string, any> = {};
    const existing = this.getCookie('app_settings');

    if (existing) {
      try {
        settings = JSON.parse(existing);
      } catch {
        settings = {};
      }
    }

    const updated = { ...settings, language };

    const expires = new Date();
    expires.setMonth(expires.getMonth() + 1);

    document.cookie = `app_settings=${encodeURIComponent(
      JSON.stringify(updated)
    )}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  }
}
