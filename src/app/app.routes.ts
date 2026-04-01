import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { RecoverPassword } from './pages/recover-password/recover-password';
import { CheckEmail } from './pages/recover-password/check-email/check-email';
import { Register } from './pages/register/register';
import { UpdateProfile } from './pages/dashboard/update-profile/update-profile';
import { Dashboard } from './pages/dashboard/dashboard';
import { RequestStatus } from './pages/dashboard/teams/request/request-status/request-status';
import { PlayerJoinTeam } from './pages/dashboard/teams/request/player-join-team/player-join-team';
import { JoinTeam } from './pages/dashboard/teams/request/join-team/join-team';
import { LeaveTeam } from './pages/dashboard/teams/request/leave-team/leave-team';
import { DeletePlayerTeam } from './pages/dashboard/teams/request/delete-player-team/delete-player-team';
import { ViewCreatedTeams } from './pages/dashboard/teams/view-created-teams/view-created-teams';
import { DeleteTeam } from './pages/dashboard/teams/delete-team/delete-team';
import { CreateTeam } from "./pages/dashboard/teams/create-team/create-team";
import { Teams } from "./pages/dashboard/teams/teams";
import { NavBar } from "./pages/dashboard/nav-bar/nav-bar";
export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'recover-password', component: RecoverPassword },
    { path: 'check-email', component: CheckEmail },
    { path: 'register', component: Register },
    { path: 'update-profile', component: UpdateProfile },
    { path: 'dashboard', component: Dashboard },
    { path: 'request-status', component: RequestStatus },
    { path: 'player-join-team', component: PlayerJoinTeam },
    { path: 'join-team', component: JoinTeam },
    { path: 'leave-team', component: LeaveTeam },
    { path: 'delete-player-team', component: DeletePlayerTeam },
    { path: 'view-created-teams', component: ViewCreatedTeams },
    { path: 'delete-team', component: DeleteTeam },
    { path: 'create-team', component: CreateTeam },
    { path: 'teams', component: Teams },
    { path: 'nav-bar', component: NavBar },
];

