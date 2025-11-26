import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TranslateService {
  private translations = signal<Record<string, any>>({});
  private currentLang = signal<string>('en');
  private supportedLangs = ['en', 'es', 'de'];

  http = inject(HttpClient)

  constructor() {
    this.initLanguage();
  }

  private initLanguage() {
    const cookieValue = this.getCookie('app_settings');
    let langToUse: string | undefined;

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

    if (!langToUse) {
      const browserLang = navigator.language.split('-')[0];
      langToUse = this.supportedLangs.includes(browserLang) ? browserLang : 'en';
      this.updateCookie(langToUse);
    }

    this.loadTranslations(langToUse);
  }

  private loadTranslations(lang: string): void {
    this.http
      .get<Record<string, any>>(`assets/i18n/${lang}.json`)
      .pipe(
        tap((data) => {
          this.translations.set(data);
          this.currentLang.set(lang);
          this.updateCookie(lang);
        }),
        catchError((error) => {
          console.error(`Error loading translations for ${lang}:`, error);
          return of({});
        })
      )
      .subscribe();
  }

  setLanguage(lang: string): void {
    if (lang !== this.currentLang() && this.supportedLangs.includes(lang)) {
      this.loadTranslations(lang);
    }
  }

  getLanguage(): string {
    return this.currentLang();
  }

  t(key: string) {
    return computed(() => {
      const dict = this.translations();
      const value = this.getNestedValue(dict, key);
      return value ?? key;
    });
  }

  private getNestedValue(obj: Record<string, any>, path: string): any {
    return path.split('.').reduce((acc, key) => acc?.[key], obj);
  }

  private getCookie(name: string): string | null {
    const match = localStorage.getItem(name);
    console.log("match", match)
    return match ? decodeURIComponent(match[2]) : null;
  }

  private updateCookie(language: string): void {
    let settings = {};
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
    document.cookie = `app_settings=${encodeURIComponent(JSON.stringify(updated))}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  }
}
