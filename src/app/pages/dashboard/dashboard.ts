import { Component } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  constructor(private router: Router) {}
  updateProfile(){
    this.router.navigate(['/update-profile']);
  }
  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
