import { CommonModule } from '@angular/common';
import { Component,Input,OnInit  } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TeamService } from '../../../../services/team';
import { DeleteTeam } from '../delete-team/delete-team';
import { ManageTeam } from '../manage-team/manage-team';
import { Team } from '../../../../models/team';
import { Profile } from "../../../../services/profile";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-view-created-teams',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './view-created-teams.html',
  styleUrl: './view-created-teams.css',
})
export class ViewCreatedTeams implements OnInit{
  @Input() typeForm!: number;
  owner:any
  teams$!: Observable<Team[]>;
  gestion:any
  currentPage = 1;
  itemsPerPage = 5;

  constructor(
    private teamService: TeamService,
    private dialog: MatDialog,
    private profileService:Profile,
    private route: ActivatedRoute
    
  ) {
    this.owner=profileService.getProfile()
    

  }
 ngOnInit(): void {
   console.log(this.owner);
    console.log(this.typeForm);
    
    
    switch (this.typeForm) {
      case -1:
          this.teams$ = this.teamService.getTeamsByOwner(this.owner.idPlayer)
          console.log(this.teams$);
          this.gestion=true
        break;
      case 0:
        
        break;
      default:
        this.teams$ = this.teamService.getTeamsByOwnerByCategory(this.owner.idPlayer,1)
        this.gestion=false;
        console.log();
        
        break;
    }
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