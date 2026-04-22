import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-team-invite',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './team-invite.html',
  styleUrls: ['./team-invite.css']
})
export class TeamInvite implements OnInit {

  @Input() team: any;

  inviteLink = '';

  ngOnInit() {
    this.inviteLink = `${window.location.origin}/join-team/${this.team.code}`;
  }

  copyCode() {
    navigator.clipboard.writeText(this.team.code);
  }

  copyLink() {
    navigator.clipboard.writeText(this.inviteLink);
  }

}