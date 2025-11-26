import { Routes } from '@angular/router';
import { NavBar } from './core/components/nav-bar/nav-bar';

export const routes: Routes = [{
    path: 'main',
    component: NavBar
  },
  { path: '**', redirectTo: 'main' }
];
