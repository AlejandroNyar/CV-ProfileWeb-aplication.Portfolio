import { Component } from '@angular/core';
import { Footer } from '../footer/footer';
import { HomeScreen } from '../home-screen/home-screen';
import { Contact } from '../contact/contact';

@Component({
  selector: 'app-main-container',
  imports: [Footer, HomeScreen, Contact],
  templateUrl: './main-container.html',
  styleUrl: './main-container.scss',
})
export class MainContainer {

}
