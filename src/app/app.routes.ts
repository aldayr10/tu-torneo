
import { Login } from './pages/login/login';
import { Routes } from '@angular/router';
import { RecoverPassword } from './pages/recover-password/recover-password';
import { CheckEmail } from './pages/recover-password/check-email/check-email';
import { Register } from './pages/register/register';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'recover-password', component: RecoverPassword },
    { path: 'check-email', component: CheckEmail },
    { path: 'register', component: Register },
];

