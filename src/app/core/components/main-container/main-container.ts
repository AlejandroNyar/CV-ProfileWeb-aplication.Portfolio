import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { HomeScreen } from '../home-screen/home-screen';

@Component({
  selector: 'app-main-container',
  imports: [Footer, HomeScreen],
  templateUrl: './main-container.html',
  styleUrl: './main-container.scss',
})
export class MainContainer {

}
