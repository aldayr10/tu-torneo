import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { RecoverPassword } from './pages/recover-password/recover-password';
import { CheckEmail } from './pages/recover-password/check-email/check-email';
import { Register } from './pages/register/register';

import { NavBar } from "./pages/dashboard/nav-bar/nav-bar";
import { UpdateProfile } from './pages/dashboard/update-profile/update-profile';
import { RequestStatus } from './pages/dashboard/teams/request/request-status/request-status';

import { Dashboard } from './pages/dashboard/dashboard';
import { Teams } from "./pages/dashboard/teams/teams";
import { addPlayerTeam } from './pages/dashboard/teams/request/player-join-team/player-join-team';
import { JoinTeam } from './pages/dashboard/teams/request/join-team/join-team';
import { LeaveTeam } from './pages/dashboard/teams/request/leave-team/leave-team';
import { DeletePlayerTeam } from './pages/dashboard/teams/request/delete-player-team/delete-player-team';
import { ViewCreatedTeams } from './pages/dashboard/teams/view-created-teams/view-created-teams';
import { DeleteTeam } from './pages/dashboard/teams/delete-team/delete-team';
import { CreateTeam } from "./pages/dashboard/teams/create-team/create-team";


import { Tournament } from "./pages/dashboard/tournament/tournament";
import { CreateTournament } from "./pages/dashboard/tournament/create-tournament/create-tournament";
import { ViewCreatedTournament } from "./pages/dashboard/tournament/view-created-tournament/view-created-tournament";
import { AllTournament } from "./pages/dashboard/tournament/all-tournament/all-tournament";

import { authGuard } from './guards/auth-guard';


export const routes: Routes = [
    // principal

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login, },
    { path: 'recover-password', component: RecoverPassword },
    { path: 'check-email', component: CheckEmail },
    { path: 'register', component: Register },
    { path: 'dashboard', component: Dashboard, canActivate: [authGuard] },

    //listas reusables
    { path: 'view-created-teams', component: ViewCreatedTeams, canActivate: [authGuard] },
    { path: 'view-created-tournament', component: ViewCreatedTournament, canActivate: [authGuard]},
    {path: 'all-tournament', component: AllTournament, canActivate: [authGuard]},

    //modulo torneos
    {
        path: 'tournament', component: Tournament, canActivateChild: [authGuard],
        children: [
            { path: 'create-tournament', component: CreateTournament },
            
        ]
    },
    //modulo equipos
    {
        path: 'teams', component: Teams, canActivateChild: [authGuard],
        children: [
            { path: 'create-team', component: CreateTeam },
            { path: 'delete-team', component: DeleteTeam },
            //gestion equipos
            { path: 'player-join-team', component: addPlayerTeam },
            { path: 'delete-player-team', component: DeletePlayerTeam },
        ]
        
    },
    



    //player
    { path: 'update-profile', component: UpdateProfile },
    { path: 'join-team', component: JoinTeam },
    { path: 'leave-team', component: LeaveTeam },
    { path: 'request-status', component: RequestStatus },








    { path: 'nav-bar', component: NavBar },


];

