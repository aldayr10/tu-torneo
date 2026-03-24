import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { TeamService } from '../../../../services/team';
import { CreateTeam } from '../create-team/create-team';
import { ManageTeam } from '../manage-team/manage-team';

@Component({
  selector: 'app-view-created-teams',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './view-created-teams.html',
  styleUrl: './view-created-teams.css',
})
export class ViewCreatedTeams implements OnInit {

  teams: any[] = [];
  ownerId: number = 1;

  constructor(
    private teamService: TeamService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.teams = this.teamService.getTeamsByOwner(this.ownerId);
  }

  addTeam() {

    const dialogRef = this.dialog.open(CreateTeam, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result) => {

      if (result) {
        this.teams.push(result);
      }

    });

  }

  openManageTeam(teamId:number){

    this.dialog.open(ManageTeam,{
      width:'500px',
      data:{teamId:teamId}
    });

  }

}