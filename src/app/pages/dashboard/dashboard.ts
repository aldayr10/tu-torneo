import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router'


@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  constructor(private router: Router) { }

  goToCreateTeam() {
    this.router.navigate(['/dashboard/view-created-teams']);
  }

  updateProfile() {
    this.router.navigate(['/update-profile']);
  }
  goToJoinTeam() { }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }



  goHome() {
    // router.navigate(['/home'])
  }

  viewProfile() {
    // router.navigate(['/profile'])
  }

  editProfile() {
    // router.navigate(['/edit-profile'])
  }

  openNotifications() {
    console.log("notificaciones");
  }
}
