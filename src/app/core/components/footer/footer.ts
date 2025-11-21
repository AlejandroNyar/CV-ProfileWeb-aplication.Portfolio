import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { DialogPrivacy } from '../dialog-privacy/dialog-privacy';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDividerModule, RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  currentYear = new Date().getFullYear();

  constructor(private dialog: MatDialog){}

  openPrivacyDialog(): void {
    this.dialog.open(DialogPrivacy, { width: '500px' });
  }
}