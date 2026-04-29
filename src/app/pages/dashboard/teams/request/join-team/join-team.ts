import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { debounceTime, Subject, switchMap } from 'rxjs';
import { UserService } from '../../../../../services/user';

import { TeamService } from '../../../../../services/team';
import { PlayerService } from '../../../../../services/player';

@Component({
  selector: 'app-join-team',
  standalone: true,
  templateUrl: './join-team.html',
  styleUrls: ['./join-team.css'],
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule,MatInputModule,MatButtonModule]
})
export class JoinTeam {

  searchEmail: string = '';
  users: any[] = [];
  selectedPlayer: any = null;
  noResults = false;
  filteredPlayers: any = []
  searchControl = new FormControl('');
  team: any

  private searchSubject = new Subject<string>();

  constructor(
    private userService: UserService,
    private teamService: TeamService,
    private playerService: PlayerService,
    private dialogRef: MatDialogRef<JoinTeam>,
    @Inject(MAT_DIALOG_DATA) public data: { team: any }
  ) {

  }


  ngOnInit() {
    this.searchControl.valueChanges.subscribe(value => {
      const search = value?.toLowerCase().trim() || '';

      if (!search) {
        this.filteredPlayers = [];
        return;
      }

      this.filteredPlayers = this.userService.getUsers()
        .filter(user =>
          user.email.toLowerCase().includes(search)
        )
        .slice(0, 5);
    });
  }



  selectPlayer(player: any) {
    this.selectedPlayer = player;
    this.searchControl.setValue(player.email);
    this.filteredPlayers = [];
  }


  sendInvite() {
    if (!this.selectedPlayer) return;
    console.log(this.selectedPlayer);
    this.teamService.sendTeamInvitation(this.data.team,this.selectedPlayer);
    this.selectedPlayer = null;
    this.searchControl.reset();
    this.filteredPlayers = [];
    
  }

  cancelSelection() {
    this.selectedPlayer = null;
    this.searchControl.reset();
    this.filteredPlayers = [];
  }
}