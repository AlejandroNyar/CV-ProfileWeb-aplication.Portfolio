import { Component, inject } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dialog-cookies',
  imports: [ MatDialogModule, MatSlideToggleModule, FormsModule, MatButtonModule],
  templateUrl: './dialog-cookies.html',
  styleUrl: './dialog-cookies.scss',
})
export class DialogCookies {
  private dialogRef = inject(MatDialogRef<DialogCookies>);

  prefsEnabled = true;

  ngOnInit() {
    const stored = sessionStorage.getItem('allow_prefs');
    if (stored !== null) this.prefsEnabled = stored === 'true';
  }

  save() {
    localStorage.setItem('allow_prefs', String(this.prefsEnabled));
    this.dialogRef.close();
  }
}
