import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { User } from '../../../models/user';
import { PlayerService } from "../../../services/player";
import { Player } from '../../../models/player';
import { Profile } from "../../../services/profile";
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-nav-bar',
  imports: [CommonModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',

})

export class NavBar implements OnInit {

  
  menuOpen = false;
  private profileSource = new BehaviorSubject<Player | null>(null);
  profile$ = this.profileSource.asObservable();
  
  constructor(private router: Router, private playerService: PlayerService, private profileService:Profile) {  
    
  }

  ngOnInit(): void {
    this.profile$=this.profileService.getProfile()
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
