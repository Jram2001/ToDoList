import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { SigninComponent } from './signin/signin.component';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimations(), provideHttpClient(withFetch()),   
     provideRouter([
      { path: '', redirectTo: '/login', pathMatch:'full' },
      { path: '**', redirectTo: '/login', pathMatch:'full' },
      {path : 'home' , loadChildren : () => import('./home.route').then(r => r.routes)},
      { path : 'login',component : SigninComponent }
    ])]
};