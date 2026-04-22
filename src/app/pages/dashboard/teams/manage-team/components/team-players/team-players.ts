import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinTeam } from '../../../request/join-team/join-team';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-team-players',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-players.html',
  styleUrls: ['./team-players.css']
})
export class TeamPlayers {
  @Input() team: any;
  constructor(private dialog: MatDialog){}
  openInvite() {
  this.dialog.open(JoinTeam, {
    width: '400px',
    data: { teamId: this.team.id }
  });
}
}