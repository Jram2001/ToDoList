import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const bootstrap = () => bootstrapApplication(AppComponent, {providers: [importProvidersFrom(HttpClientModule),importProvidersFrom(BrowserAnimationsModule)]});

export default bootstrap;

