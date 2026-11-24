import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { TeamService } from '../../../../services/team';
import { DeleteTeam } from '../delete-team/delete-team';
import { Team } from '../../../../models/team';
import { ProfileService } from "../../../../services/profile";
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth';



@Component({
  selector: 'app-view-created-teams',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './view-created-teams.html',
  styleUrl: './view-created-teams.css',
})
export class ViewCreatedTeams implements OnInit {

  owner: any;
  currentUserId: number | null = null;
  teams$!: Observable<Team[]>;
  currentPage = 1;
  itemsPerPage = 5;

  constructor(
    private teamService: TeamService,
    private dialog: MatDialog,
    private profileService: ProfileService,
    private router: Router,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUser()?.idUser ?? null;
    this.profileService.getProfile().subscribe(owner => {
      if (owner) {
        this.owner = owner;
        this.currentUserId = owner.idUser ?? this.currentUserId;
      }
      this.loadTeams();
    });
    this.loadTeams();
  }

  loadTeams(): void {
    const userId = this.currentUserId ?? this.owner?.idUser;
    if (!userId) return;
    this.teams$ = this.teamService.getTeamsByOwner(userId);
  }

  getPaginatedTeams(teams: Team[]) {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return teams.slice(start, start + this.itemsPerPage);
  }

  getTotalPages(teams: Team[]) {
    return Math.ceil(teams.length / this.itemsPerPage);
  }

  openManageTeam(teamId: number) {
    this.router.navigate(['/manage-team', teamId]);
  }

  deleteTeam(id: number) {
    const dialogRef = this.dialog.open(DeleteTeam, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.teamService.deteleTeam(id).subscribe({
          next: () => {
            alert('Equipo eliminado correctamente');
            this.loadTeams();
          },
          error: (err) => alert(err?.error?.message || 'No se pudo eliminar el equipo.'),
        });
      }
    });
  }

}