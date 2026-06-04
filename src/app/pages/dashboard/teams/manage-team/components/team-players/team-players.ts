import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinTeam } from '../../../request/join-team/join-team';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-team-players',
  standalone: true,
  imports: [],
  templateUrl: './team-players.html',
  styleUrls: ['./team-players.css']
})
export class TeamPlayers {
  @Input() team: any;
  @Output() inviteRequested = new EventEmitter<void>();
  constructor(private dialog: MatDialog) { }
  openInvite() {
    this.inviteRequested.emit();
    this.dialog.open(JoinTeam, {
      width: '800px',
      data: { team: this.team }
    });
  }
}