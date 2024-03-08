import { Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';

export const routes: Routes = [
    {path : 'login', component:SigninComponent ,pathMatch:'full' }
];
