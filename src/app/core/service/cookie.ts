import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Cookie {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  private cookieName: string = 'app_settings';

  getCookie(name: string = this.cookieName): string | null {
    if (!this.isBrowser) return null;

    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
  }

  updateCookie( key: string, value: any, cookieName: string = this.cookieName) {
    if (!this.isBrowser) return;
    const existing = this.getCookie(cookieName);

    let settings: Record<string, any> = {};

    if (existing) {
      try {
        settings = JSON.parse(existing);
      } catch {
        settings = {};
      }
    }

    settings[key] = value;

    const expires = new Date();
    expires.setMonth(expires.getMonth() + 1);

    document.cookie =
      `${cookieName}=${encodeURIComponent(JSON.stringify(settings))};` +
      `expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  }
}
