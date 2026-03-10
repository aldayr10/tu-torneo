import { Component } from '@angular/core';
import {Router} from '@angular/router'
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  constructor(private router: Router) {}

  viewTeams(){
    this.router.navigate(['/create-team']);
  }
  updateProfile(){
    this.router.navigate(['/update-profile']);
  }
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
