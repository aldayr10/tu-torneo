import { Component, ViewChild } from '@angular/core';
import { CreateTeam } from "./create-team/create-team";
import { ViewCreatedTeams } from "./view-created-teams/view-created-teams";
import { Router } from '@angular/router'

@Component({
  selector: 'app-teams',
  imports: [CreateTeam, ViewCreatedTeams],
  templateUrl: './teams.html',
  styleUrl: './teams.css',
})
export class Teams {
  @ViewChild(ViewCreatedTeams) viewCreatedTeams?: ViewCreatedTeams;

  constructor(
    private router:Router
  ){ }

  goToDAshboard(){
    this.router.navigate(['/dashboard']);
  }

  onTeamCreated() {
    this.viewCreatedTeams?.loadTeams();
  }
}
