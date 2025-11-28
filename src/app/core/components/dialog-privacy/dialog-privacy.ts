import { Component, inject } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { TranslateService } from '../../service/translate-service';

@Component({
  selector: 'app-dialog-privacy',
  imports: [MatDialogModule, MatButtonModule],
  templateUrl: './dialog-privacy.html',
  styleUrl: './dialog-privacy.scss',
})
export class DialogPrivacy {
  translate = inject(TranslateService);
}
