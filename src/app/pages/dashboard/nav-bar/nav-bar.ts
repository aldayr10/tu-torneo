import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { User } from '../../../models/user';

@Component({
  selector: 'app-nav-bar',
  imports: [],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar implements OnInit {

  constructor(private router: Router) { }
  menuOpen = false;
  user:any
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      const userString = localStorage.getItem('user');
      this.user = userString ? JSON.parse(userString) : null;
    }
  }

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

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
