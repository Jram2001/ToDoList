import { ApplicationConfig, Component, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { auth } from './app.AuthGuard';

export const appConfig: ApplicationConfig = {
  providers: [ provideClientHydration(), provideAnimations(), provideHttpClient(withFetch()),  
     provideRouter([
      { path :'*', redirectTo: '/login'},
      { path: '', redirectTo: '/login', pathMatch:'full' },
      { path : 'home'  , loadComponent: () => import('./home/home.component').then(Component => Component.HomeComponent) , canActivate : [auth]},
      { path : 'login',component : SigninComponent }
    ])]
};