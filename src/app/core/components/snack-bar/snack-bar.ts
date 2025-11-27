import { Component, Inject } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snack-bar',
  imports: [MatIcon],
  templateUrl: './snack-bar.html',
  styleUrl: './snack-bar.scss',
})
export class SnackBar {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}
}
