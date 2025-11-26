import { Component, inject, signal, ViewChild } from '@angular/core';
import { Scroll } from '../../service/scroll';
import { ThemeService } from '../../service/theme-service';
import { TranslateService } from '../../service/translate-service';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatOption, MatSelect } from '@angular/material/select';
import { MainContainer } from '../main-container/main-container';
import { supportedLangs } from '../../model/suportedLanguage';

@Component({
  selector: 'app-nav-bar',
  imports: [
    MainContainer,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSelect,
    MatOption,
  ],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar {
  @ViewChild('drawer') drawer!: MatSidenav;
  public scroll: Scroll = inject(Scroll);
  public theme: ThemeService = inject(ThemeService);
  public translateService: TranslateService = inject(TranslateService);

  public supportedLang: supportedLangs[] = this.translateService.getSupportedLanguages()

  sections = [
    { label: 'Home' },
    { label: 'Who am I' },
    { label: 'Services' },
    { label: 'Work' },
    { label: 'Contact' },
  ];

  constructor() {}

  goTo(i: number) {
    this.scroll.goTo(i);
  }

  isActive(i: number) {
    return this.scroll.currentIndex() === i;
  }

  // theme
  toggleTheme() {
    this.theme.toggle();
  }

  isDark() {
    return this.theme.isDark();
  }

  lang = signal(this.translateService.getLanguage());
  changeLang(lang: string) {
    this.translateService.setLanguage(lang);
    this.lang.set(lang);
  }
}
