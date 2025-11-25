import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Scroll } from '../../service/scroll';

@Component({
  selector: 'app-home-screen',
  imports: [MatButton],
  templateUrl: './home-screen.html',
  styleUrl: './home-screen.scss',
})
export class HomeScreen {
  public scrollSvc = inject(Scroll)
}
