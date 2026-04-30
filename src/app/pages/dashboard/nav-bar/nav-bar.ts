import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from "../../../services/player";
import { Player } from '../../../models/player';
import { ProfileService } from "../../../services/profile";
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Notifications } from '../news/notification/notification';


import { NotificationService } from '../../../services/notification.service';
import { RequestService } from '../../../services/request';


@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, Notifications],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar implements OnInit {

  notificationsOpen = false;
  menuOpen = false;

  private profileSource = new BehaviorSubject<Player | null>(null);
  profile$ = this.profileSource.asObservable();

  totalNotifications = 0;
  player: Player | null = null;

  constructor(
    private router: Router,

    private profileService: ProfileService,

    private notificationService: NotificationService,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {

  
    this.profileService.getProfile().subscribe(profile => {
      this.player = profile;
      this.profileSource.next(profile);

      this.initNotifications();
    });

  }


  initNotifications() {

    if (!this.player) return;

    this.notificationService.getUserNotifications(this.player.idPlayer)
      .subscribe(() => this.calculateTotalNotifications());

    this.requestService.getRequests()
      .subscribe(() => this.calculateTotalNotifications());

  }


  calculateTotalNotifications() {

    if (!this.player) return;

    const unread = this.notificationService
      .getUnreadCount(this.player.idPlayer);

    const pending = this.requestService
      .getPendingCount();

    this.totalNotifications = unread + pending;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  goHome() {
    this.router.navigate(['/dashboard']);
  }

  viewProfile() {
    this.router.navigate(['/profile']);
  }

  editProfile() {
    this.router.navigate(['/update-profile']);
  }

  openAddTeam(){
    this.router.navigate(['/player-join-team']);

  }

  openNotifications() {
    this.toggleNotifications();
  }

  toggleNotifications() {

    this.notificationsOpen = !this.notificationsOpen;
  }

  closeNotifications() {

    this.notificationsOpen = false;
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}