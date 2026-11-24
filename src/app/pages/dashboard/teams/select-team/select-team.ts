import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TeamService } from '../../../../services/team';
import { Team } from '../../../../models/team';
import { ProfileService } from "../../../../services/profile";
import { Tournament } from '../../../../models/tournament';
import { Player } from '../../../../models/player';
import { AuthService } from '../../../../services/auth';


@Component({
  selector: 'app-select-team',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './select-team.html',
  styleUrl: './select-team.css',
})
export class SelectTeam implements OnInit {
  owner?: Player;
  tournament!: Tournament
  teams$!: Observable<Team[]>;

  currentPage = 1;
  itemsPerPage = 5;

  constructor(
    public dialogRef: MatDialogRef<SelectTeam>,
    private teamService: TeamService,
    private profileService: ProfileService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: { tournament: Tournament },
  ) {}

  ngOnInit(): void {
    this.tournament = this.data.tournament;
    const currentUserId = this.authService.getCurrentUser()?.idUser ?? null;

    this.profileService.getProfile().subscribe(owner => {
      if (owner) this.owner = owner;
      const userId = owner?.idUser ?? currentUserId;
      if (userId) {
        this.teams$ = this.teamService.getTeamsByOwnerByCategory(
          userId,
          this.tournament.categoryId
        );
      }
    });

    if (currentUserId && !this.teams$) {
      this.teams$ = this.teamService.getTeamsByOwnerByCategory(
        currentUserId,
        this.tournament.categoryId
      );
    }
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
