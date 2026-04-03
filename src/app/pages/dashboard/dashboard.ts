import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavBar } from "./nav-bar/nav-bar";


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
    
  ) {}

  goToTeam() {
    this.router.navigate(['/teams']);
  }

  goToTournament() {
    this.router.navigate(['/tournament']);
  }
 
}
