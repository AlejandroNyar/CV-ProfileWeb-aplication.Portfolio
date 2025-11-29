import { Component } from '@angular/core';
import { NgStyle} from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-carrousel',
  imports: [MatIcon, MatIconModule, MatButtonModule, MatCardModule, NgStyle],
  templateUrl: './carrousel.html',
  styleUrl: './carrousel.scss',
})
export class Carrousel {

  current = 0;

  public projectsDoomie = [
    {
      title: 'Gestor de Tareas',
      description: 'Aplicación full-stack en Angular + Firebase.',
      img: 'assets/projects/project1.png'
    },
    {
      title: 'Landing corporativa',
      description: 'Landing moderna con Material 3.',
      img: 'assets/projects/project2.png'
    },
    {
      title: 'Dashboard Analytics',
      description: 'Dashboard con gráficas y charts.',
      img: 'assets/projects/project3.png'
    }
  ];

  next() {
    this.current = (this.current + 1) % this.projectsDoomie.length;
  }

  prev() {
    this.current =
      (this.current - 1 + this.projectsDoomie.length) % this.projectsDoomie.length;
  }
}
