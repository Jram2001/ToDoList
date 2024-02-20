import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';

const bootstrap = () => bootstrapApplication(AppComponent, { providers: [importProvidersFrom(),importProvidersFrom(DatePipe),provideHttpClient(withFetch()),importProvidersFrom(NoopAnimationsModule)] });
export default bootstrap;

