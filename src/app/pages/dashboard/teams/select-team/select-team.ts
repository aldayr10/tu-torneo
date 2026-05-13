import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TeamService } from '../../../../services/team';
import { Team } from '../../../../models/team';
import { ProfileService } from "../../../../services/profile";
import { Tournament } from '../../../../models/tournament';
import { Player } from '../../../../models/player';


@Component({
  selector: 'app-select-team',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './select-team.html',
  styleUrl: './select-team.css',
})
export class SelectTeam implements OnInit {
  owner!: Player;
  tournament!:Tournament
  teams$!: Observable<Team[]>;


  currentPage = 1;
  itemsPerPage = 5;
  constructor(
    public dialogRef: MatDialogRef<SelectTeam>,
    private teamService: TeamService,
    private profileService: ProfileService,
    @Inject(MAT_DIALOG_DATA) public data: { tournament: Tournament },
  ) {
 
  }

 ngOnInit(): void {
  this.tournament = this.data.tournament;
  console.log(this.tournament);
  
  this.profileService.getProfile().subscribe(owner => {
    if (owner) {
      this.owner = owner;
      console.log(this.tournament.categoryId);
      
      this.teams$  = this.teamService.getTeamsByOwnerByCategory(
        this.owner.idPlayer,
        this.tournament.categoryId
      );
      console.log(this.teams$);
      

    }
    
  });
}


  getPaginatedTeams(teams: Team[]) {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return teams.slice(start, start + this.itemsPerPage);
  }

  getTotalPages(teams: Team[]) {
    return Math.ceil(teams.length / this.itemsPerPage);
  }

  selectTeam(team: Team) {
    this.dialogRef.close(team)
  }
  goToTeams() {

  }


}
