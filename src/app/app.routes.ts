
import { Login } from './pages/login/login';
import { Routes } from '@angular/router';
import { RecoverPassword } from './pages/recover-password/recover-password';
import { CheckEmail } from './pages/recover-password/check-email/check-email';
import { Register } from './pages/register/register';
import { UpdateProfile } from './pages/dashboard/update-profile/update-profile';
import { Dashboard } from './pages/dashboard/dashboard';
import { CreateTeam } from './pages/create-team/create-team';

import { LeaveTeam } from './pages/leave-team/leave-team';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'recover-password', component: RecoverPassword },
    { path: 'check-email', component: CheckEmail },
    { path: 'register', component: Register },
    { path: 'update-profile', component:UpdateProfile  },
    { path: 'create-team', component:CreateTeam  },
    { path: 'dashboard', component:Dashboard},

    { path: 'leave-team', component:LeaveTeam}
];

