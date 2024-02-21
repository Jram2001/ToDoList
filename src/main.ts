import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HomeComponent } from './app/home/home.component';
import { DatePipe } from '@angular/common';
import { importProvidersFrom } from '@angular/core';
const mergedConfig = {}
bootstrapApplication(AppComponent, appConfig )
  .catch((err) => console.error(err));

