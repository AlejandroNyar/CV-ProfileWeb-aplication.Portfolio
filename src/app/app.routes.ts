import { Routes } from '@angular/router';
import { MainContainer } from './core/components/main-container/main-container';

export const routes: Routes = [{
    path: 'main',
    component: MainContainer
  },
  { path: '**', redirectTo: 'main' },];
