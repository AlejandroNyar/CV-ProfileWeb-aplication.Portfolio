import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackBar } from '../components/snack-bar/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private snackBar: MatSnackBar) {}

  private open(message: string, type: 'success' | 'error' | 'info') {
    const config: MatSnackBarConfig = {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [`notif-${type}`],
      data: { message, type }
    };

    this.snackBar.openFromComponent(SnackBar, config);
  }

  success(message: string) {
    this.open(message, 'success');
  }

  error(message: string) {
    this.open(message, 'error');
  }

  info(message: string) {
    this.open(message, 'info');
  }
}
