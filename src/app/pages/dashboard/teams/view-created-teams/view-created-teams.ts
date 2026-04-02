import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { TeamService } from '../../../../services/team';
import { DeleteTeam } from '../delete-team/delete-team';
import { ManageTeam } from '../manage-team/manage-team';
import { Team } from '../../../../models/team';

@Component({
  selector: 'app-view-created-teams',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './view-created-teams.html',
  styleUrl: './view-created-teams.css',
})
export class ViewCreatedTeams {

  ownerId: number = 1;
  teams$!: Observable<Team[]>;
  gestion=false
  currentPage = 1;
  itemsPerPage = 5;

  constructor(
    private teamService: TeamService,
    private dialog: MatDialog
  ) {
    this.teams$ = this.teamService.teams$.pipe(
      map(teams => teams.filter(team => team.ownerId === this.ownerId))
    );
  }


  getPaginatedTeams(teams: Team[]) {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return teams.slice(start, start + this.itemsPerPage);
  }


  getTotalPages(teams: Team[]) {
    return Math.ceil(teams.length / this.itemsPerPage);
  }

  openManageTeam(teamId: number) {
    this.dialog.open(ManageTeam, {
      width: '500px',
      data: { teamId }
    });
  }

  deleteTeam(id: number) {
    const dialogRef = this.dialog.open(DeleteTeam, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.teamService.deteleTeam(id);
        alert('Equipo eliminado correctamente');
      }
    });
  }

}