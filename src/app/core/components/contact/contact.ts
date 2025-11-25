import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ContactService } from '../../service/contact-service';

@Component({
  selector: 'app-contact',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  private fb: FormBuilder = inject(FormBuilder);
  private contactService: ContactService = inject(ContactService);

  contactForm = this.fb.group({
    // name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required],
    privacy: [false, Validators.requiredTrue],
  });

  async send() {
    if (this.contactForm.invalid) return;

    const payload = this.contactForm.value;

    try {
      await this.contactService.sendToFirestore(payload);
      alert('Mensaje enviado con éxito');
      this.contactForm.reset();
    } catch (error) {
      console.error(error);
      alert('Error al enviar el mensaje');
    }
  }

  linkMailTo() {
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
        alert(
          'No hemos podido abrir tu aplicación de correo. Asegúrate de tener un cliente de correo configurado.'
        );
      }
    }, 800);
  }
}
