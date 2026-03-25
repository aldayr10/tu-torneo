import { Component } from '@angular/core';
import { Router } from '@angular/router'
import { NavBar } from "./nav-bar/nav-bar";


@Component({
  selector: 'app-dashboard',
  imports: [NavBar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  constructor(private router: Router) { }

  goToCreateTeam() {
    this.router.navigate(['/teams']);
  }
 
}