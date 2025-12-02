import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCookies } from '../dialog-cookies/dialog-cookies';

@Component({
  selector: 'app-cookies-button',
  imports: [],
  templateUrl: './cookies-button.html',
  styleUrl: './cookies-button.scss',
})
export class CookiesButton{
  private dialog = inject(MatDialog);

  openDialog() {
    this.dialog.open(DialogCookies, {
      width: '380px',
      panelClass: 'cookies-dialog-panel'
    });
  }
}
