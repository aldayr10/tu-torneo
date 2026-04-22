import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { debounceTime, Subject, switchMap } from 'rxjs';
import { UserService } from '../../../../../services/user';

import { TeamService } from '../../../../../services/team';
import { PlayerService } from '../../../../../services/player';

@Component({
  selector: 'app-join-team',
  standalone: true,
  templateUrl: './join-team.html',
  styleUrls: ['./join-team.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class JoinTeam {

  searchEmail: string = '';
  users: any[] = [];
  selectedUser: any = null;
  noResults = false;

  private searchSubject = new Subject<string>();

  constructor(
    private userService: UserService,
    private teamService: TeamService,
    private playerService:PlayerService,
    private dialogRef: MatDialogRef<JoinTeam>,
    @Inject(MAT_DIALOG_DATA) public data: { teamId: string }
  ) {
   
  }

  onSearch() {
    this.searchSubject.next(this.searchEmail);
  }

  selectUser(user: any) {
    this.selectedUser = user;
  }

 

}