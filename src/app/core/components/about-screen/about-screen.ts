import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-about-screen',
  imports: [CommonModule, MatCardModule],
  templateUrl: './about-screen.html',
  styleUrl: './about-screen.scss',
})
export class AboutScreen {

  parallaxOffset = 0;

  @HostListener('window:scroll')
  onScroll() {
    // La velocidad se puede ajustar
    this.parallaxOffset = window.scrollY * 0.15;
  }

}
