import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'OK Lab Karlsruhe - Kiosk Home'
  },
  {
    path: 'media',
    loadComponent: () => import('./pages/media/media.component').then(m => m.MediaComponent),
    title: 'OK Lab Karlsruhe - Videos'
  },
  {
    path: 'demos',
    loadComponent: () => import('./pages/demos/demos.component').then(m => m.DemosComponent),
    title: 'OK Lab Karlsruhe - Interactive Demos'
  },
  {
    path: 'raffle',
    loadComponent: () => import('./pages/raffle/raffle.component').then(m => m.RaffleComponent),
    title: 'OK Lab Karlsruhe - Gewinnspiel'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    title: 'OK Lab Karlsruhe - Über uns'
  },
  {
    path: 'config',
    loadComponent: () => import('./pages/config/config.component').then(m => m.ConfigComponent),
    title: 'OK Lab Karlsruhe - Kiosk Config'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
