import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TeamService } from '../../../../services/team';

@Component({
  selector: 'app-view-created-teams',
  imports: [CommonModule],
  templateUrl: './view-created-teams.html',
  styleUrl: './view-created-teams.css',
})
export class ViewCreatedTeams implements OnInit {

  teams: any[] = [];
  ownerId: number = 1; // usuario actual simulado

  constructor(
    private teamService: TeamService,
    private router: Router
  ) {}

  ngOnInit() {

    // obtener equipos creados por el usuario
    this.teams = this.teamService.getTeamsByOwner(this.ownerId);

  }

  addTeam() {
    this.router.navigate(['/create-team']);
  }

}
