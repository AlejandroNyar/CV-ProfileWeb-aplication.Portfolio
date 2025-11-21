import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslateService } from '../../service/translate-service';

@Component({
  selector: 'app-dialog-privacy',
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './dialog-privacy.html',
  styleUrl: './dialog-privacy.scss',
})
export class DialogPrivacy {
  translate = inject(TranslateService);
}
