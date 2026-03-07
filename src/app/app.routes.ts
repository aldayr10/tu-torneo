//import { Routes } from '@angular/router';
//export const routes: Routes = [];

import { Routes } from '@angular/router';
import { RecoverPassword } from './pages/recover-password/recover-password';
import { CheckEmail } from './pages/recover-password/check-email/check-email';

export const routes: Routes = [
    { path: '', redirectTo: 'recover-password', pathMatch: 'full' },
    { path: 'recover-password', component: RecoverPassword },
    { path: 'check-email', component: CheckEmail },
];