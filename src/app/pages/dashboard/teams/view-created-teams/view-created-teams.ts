import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { TeamService } from '../../../../services/team';
import { DeleteTeam } from '../delete-team/delete-team';
import { ManageTeam } from '../manage-team/manage-team';

@Component({
  selector: 'app-view-created-teams',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './view-created-teams.html',
  styleUrl: './view-created-teams.css',
})
export class ViewCreatedTeams implements OnInit {
  index: number = -1;
  teams: any[] = [];
  ownerId: number = 1;

  constructor(
    private teamService: TeamService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.teamService.teams$.subscribe(teams => {
      this.teams = teams.filter(team => team.ownerId === this.ownerId);
    });
  }


  openManageTeam(teamId: number) {

    this.dialog.open(ManageTeam, {
      width: '500px',
      data: { teamId: teamId }
    });

  }

  deleteTeam(id: number) {

    const dialogRef = this.dialog.open(DeleteTeam, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.index = this.teams.findIndex(o => o.id == id)
        this.teams.splice(this.index, 1);
        this.teamService.deteleTeams(id)
        alert('Equipo eliminado correctamente');



      }
    });

  }

}