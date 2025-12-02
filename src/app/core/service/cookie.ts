import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Cookie {
  private platformId = inject(PLATFORM_ID);
  private isBrowser = isPlatformBrowser(this.platformId);

  getCookie(name: string): string | null {
    if (!this.isBrowser) return null;

    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
  }

  updateCookie(cookieName:string, value: string) {
    if (!this.isBrowser) return;

    const expires = new Date();
    expires.setMonth(expires.getMonth() + 1);

    const settings = {
      value,
    };

    document.cookie =
      `${cookieName}=${encodeURIComponent(JSON.stringify(settings))};` +
      `expires=${expires.toUTCString()};path=/;SameSite=Lax`;
  }
}
