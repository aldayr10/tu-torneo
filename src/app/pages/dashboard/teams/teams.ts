import { Component } from '@angular/core';
import { CreateTeam } from "./create-team/create-team";
import { ViewCreatedTeams } from "./view-created-teams/view-created-teams";
import { Router } from '@angular/router'
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-teams',
  imports: [CreateTeam, ViewCreatedTeams,RouterOutlet],
  templateUrl: './teams.html',
  styleUrl: './teams.css',
})
export class Teams {

  constructor(
    private router:Router
  ){ }

  goToDAshboard(){
    this.router.navigate(['/dashboard']);
  }

}
