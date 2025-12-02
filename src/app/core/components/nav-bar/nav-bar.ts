import { AfterViewInit, Component, inject, signal, ViewChild, WritableSignal } from '@angular/core';
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
import { SectionItem } from '../../model/sectionItem';
import { CookiesButton } from "../cookies-button/cookies-button";
import { Cookie } from '../../service/cookie';

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
    CookiesButton
],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.scss',
})
export class NavBar implements AfterViewInit{
  @ViewChild('drawer') drawer!: MatSidenav;

  public scroll: Scroll = inject(Scroll);
  public theme: ThemeService = inject(ThemeService);
  public translateService: TranslateService = inject(TranslateService);

  public lang = this.translateService.currentLang;
  public supportedLang: supportedLangs[] = this.translateService.getSupportedLanguages()

  sections : SectionItem[] = this.scroll.getSections();

  constructor() {
  }

  ngAfterViewInit(): void {
  }

  goTo(sectionName: string) {
    this.scroll.goToSection(sectionName);
  }

  isActive(i: number) {
    return this.scroll.currentIndex() === i;
  }

  toggleTheme() {
    this.theme.toggle();
  }

  isDark() {
    return this.theme.isDark();
  }

  changeLang(lang: string) {
    this.translateService.setLanguage(lang);
    this.lang.set(lang);
  }
}
