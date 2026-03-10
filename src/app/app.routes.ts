import { Routes } from '@angular/router';
import {Register } from './pages/register/register';
import {UpdateProfile } from './pages/update-profile/update-profile';
export const routes: Routes = [ 
    { path: '', redirectTo: 'update-profile', pathMatch: 'full' },
    { path: 'update-profile', component:UpdateProfile  },
    { path: 'register', component: Register }
];
