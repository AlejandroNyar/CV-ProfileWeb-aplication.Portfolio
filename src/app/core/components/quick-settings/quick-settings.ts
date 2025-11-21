import { Component, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogSettings } from '../dialog-settings/dialog-settings';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { SettingsService } from '../../services/settings-service';
import { TranslateService } from '../../services/translate-service';

@Component({
  selector: 'app-quick-settings',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
  ],
  templateUrl: './quick-settings.html',
  styleUrl: './quick-settings.scss',
})
export class QuickSettings {
  private settingsService = inject(SettingsService);
  translateService: TranslateService = inject(TranslateService);
  
  isOpen = signal(false);
  darkMode = this.settingsService.darkMode ?? signal(false);
  language = this.settingsService.language ?? signal('en');


  constructor(private dialog: MatDialog) {}

  togglePanel() {
    this.isOpen.update((v) => !v);
  }

  toggleDarkMode(event: any) {
    this.settingsService.toggleDarkMode()
  }

  changeLanguage(lang: string) {
    this.settingsService.setLanguageCookie(lang)
  }

  openSettingsDialog() {
    this.dialog.open(DialogSettings, { width: '400px' });
  }
}
