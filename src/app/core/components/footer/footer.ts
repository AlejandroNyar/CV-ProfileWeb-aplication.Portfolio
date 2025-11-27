import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { DialogPrivacy } from '../dialog-privacy/dialog-privacy';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../service/notification-service';

@Component({
  selector: 'app-footer',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDividerModule, RouterModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private dialog: MatDialog = inject(MatDialog);
  private notifService: NotificationService = inject(NotificationService);
  currentYear = new Date().getFullYear();

  constructor(){}

  openPrivacyDialog(): void {
    this.dialog.open(DialogPrivacy, { width: '500px' });
  }

  linkMailTo(event: Event) {
    event?.preventDefault()
    const email = 'tuemail@ejemplo.com';
    const subject = 'Consulta desde la web';
    const body = '';

    const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Lanzamos el mailto
    window.location.href = mailto;

    // Esperamos 800ms para ver si el navegador salió de la página
    setTimeout(() => {
      if (!document.hidden) {
        // Si aún estamos en la página → mailto probablemente falló
        this.notifService.error(
          'No hemos podido abrir tu aplicación de correo. Asegúrate de tener un cliente de correo configurado.'
        );
      }
    }, 800);
  }
}