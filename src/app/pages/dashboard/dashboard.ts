import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavBar } from "./nav-bar/nav-bar";
import { ViewCreatedTournament } from "./tournament/view-created-tournament/view-created-tournament";


@Component({
  selector: 'app-dashboard',
  imports: [NavBar,ViewCreatedTournament],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

  player: any; 

  constructor(
    private router: Router,
    
  ) {}

  goToTeam() {
    this.router.navigate(['/teams']);
  }

  goToTournament() {
    this.router.navigate(['/tournament']);
  }
  
  goToGame() {
    this.router.navigate(['view-created-teams',1]);
  }
}
