import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavBar } from "./nav-bar/nav-bar";
import { PlayerService } from '../../services/player';
import { Player } from '../../models/player';

@Component({
  selector: 'app-dashboard',
  imports: [NavBar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  player: any; 

  constructor(
    private router: Router,
    private playerService: PlayerService
  ) {}

  goToCreateTeam() {
    this.router.navigate(['/teams']);
  }
}
