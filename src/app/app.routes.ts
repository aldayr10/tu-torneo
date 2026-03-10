
import { Login } from './pages/login/login';
import { Routes } from '@angular/router';
import { RecoverPassword } from './pages/recover-password/recover-password';
import { CheckEmail } from './pages/recover-password/check-email/check-email';
import { Register } from './pages/register/register';
import { UpdateProfile } from './pages/update-profile/update-profile';
import { Dashboard } from './pages/dashboard/dashboard';
import { RequestStatus } from './pages/dashboard/request-status/request-status';
import{PlayerJoinTeam}from'./pages/dashboard/player-join-team/player-join-team';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'recover-password', component: RecoverPassword },
    { path: 'check-email', component: CheckEmail },
    { path: 'register', component: Register },
    { path: 'update-profile', component: UpdateProfile },
    { path: 'dashboard', component: Dashboard},
    { path: 'request-status', component: RequestStatus },
    { path: 'player-join-team', component: PlayerJoinTeam },


];

