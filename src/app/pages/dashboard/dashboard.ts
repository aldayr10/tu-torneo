import { Component } from '@angular/core';
import { Router } from '@angular/router'


@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  constructor(private router: Router) { }

  goToCreateTeam() {
    this.router.navigate(['/create-team']);
  }



  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }



  goHome() {
   
  }

  viewProfile() {
    
  }

  editProfile() {
    this.router.navigate(['/update-profile']);
  }

  openNotifications() {
    console.log("notificaciones");
  }
}