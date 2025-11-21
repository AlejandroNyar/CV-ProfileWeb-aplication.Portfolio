import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../../service/settings-service';
import { TranslateService } from '../../service/translate-service';

@Component({
  selector: 'app-dialog-settings',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatFormFieldModule
  ],
  templateUrl: './dialog-settings.html',
  styleUrl: './dialog-settings.scss',
})
export class DialogSettings {
  settings = inject(SettingsService);
  translate = inject(TranslateService);

  toggleDarkMode() {
    this.settings.darkMode.update(v => !v);
    this.settings.saveSettings();
  }

  updateLanguage(value: string) {
    this.settings.language.set(value);
    this.settings.saveSettings();
  }

  updateTheme(value: string) {
    this.settings.theme.set(value);
    this.settings.saveSettings();
  }
}
