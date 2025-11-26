import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private dark = signal(false);

  isDark() {
    return this.dark();
  }

  toggle() {
    this.dark.update(x => !x);

    document.body.classList.toggle('dark-theme', this.dark());
  }
}
