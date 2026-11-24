import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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
    private teamService: TeamService,
    private router:Router
  ) {
    console.log('asd');
    
  }

  goToDAshboard(){
    this.router.navigate(['/teams']);
  }

  ngOnInit() {
    this.loadTeam();
  }

  loadTeam() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) return;
    this.teamService.fetchTeamById(id).subscribe({
      next: team => this.team = team,
      error: () => { /* handled by interceptor/UI as needed */ }
    });
  }

  changeTab(tab: 'info' | 'players' | 'invite') {
    this.activeTab = tab;
  }

  onTeamChanged() {
    this.loadTeam();
  }
}