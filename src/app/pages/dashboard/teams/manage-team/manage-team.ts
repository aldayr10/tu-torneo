import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TeamService } from '../../../../services/team';
import { TeamInfo } from './components/team-info/team-info';
import { TeamPlayers } from './components/team-players/team-players';
import { TeamInvite } from './components/team-invite/team-invite';


@Component({
  selector: 'app-manage-team',
  standalone: true,
  imports: [CommonModule, TeamInfo, TeamPlayers,TeamInvite],
  templateUrl: './manage-team.html',
  styleUrls: ['./manage-team.css']
})
export class ManageTeam implements OnInit {

  @Input() team: any;
  activeTab: 'info' | 'players' | 'invite' = 'info';

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService
  ) {
    console.log('asd');
    
  }

  ngOnInit() {
    console.log('asd');
    
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.team = this.teamService.getTeamByIdTeam(id);
  }

  changeTab(tab: 'info' | 'players' | 'invite') {
    this.activeTab = tab;
  }
}