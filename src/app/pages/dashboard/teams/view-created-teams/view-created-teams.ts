import { CommonModule } from '@angular/common';
import { Component,  OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TeamService } from '../../../../services/team';
import { DeleteTeam } from '../delete-team/delete-team';
import { ManageTeam } from '../manage-team/manage-team';
import { Team } from '../../../../models/team';
import { ProfileService } from "../../../../services/profile";
import { ActivatedRoute } from '@angular/router';
import { Optional } from '@angular/core';


@Component({
  selector: 'app-view-created-teams',
  standalone: true,
  imports: [CommonModule, MatDialogModule,],
  templateUrl: './view-created-teams.html',
  styleUrl: './view-created-teams.css',
})
export class ViewCreatedTeams implements OnInit {

  owner: any;
  teams$!: Observable<Team[]>;
  currentPage = 1;
  itemsPerPage = 5;

  constructor(
    private teamService: TeamService,
    private dialog: MatDialog,
    private profileService: ProfileService,
    @Optional() private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {


    this.profileService.getProfile().subscribe(owner => {
      if (!owner) return;
      this.owner = owner;
      this.teams$=this.teamService.getTeamsByOwner(owner.idPlayer);
      
      
    })
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