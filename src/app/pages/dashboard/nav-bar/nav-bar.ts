import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from '../../../models/player';
import { ProfileService } from "../../../services/profile";
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Notifications } from '../news/notification/notification';


import { NotificationService } from '../../../services/notification.service';
import { RequestService } from '../../../services/request';
import { AuthService } from '../../../services/auth';


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
  currentUserId: number | null = null;

  constructor(
    private router: Router,

    private profileService: ProfileService,
    private authService: AuthService,

    private notificationService: NotificationService,
    private requestService: RequestService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    this.currentUserId = currentUser?.idUser ?? null;

    this.profileService.getProfile().subscribe(profile => {
      this.player = profile;
      this.profileSource.next(profile);

      this.initNotifications();
    });
  }


  initNotifications() {
    if (!this.player) return;

    this.notificationService.getNotifications()
      .subscribe(notifications => this.calculateTotalNotifications(notifications, undefined));

    this.requestService.getRequests()
      .subscribe(requests => this.calculateTotalNotifications(undefined, requests));
  }

  private lastNotifications: any[] = [];
  private lastRequests: any[] = [];

  calculateTotalNotifications(notifications?: any[], requests?: any[]) {
    if (notifications) this.lastNotifications = notifications;
    if (requests) this.lastRequests = requests;

    const unread = this.lastNotifications.filter(n => !n.read).length;
    const pending = this.lastRequests.filter(r => r.status === 'Pendiente').length;

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
    this.authService.logout();
  }
}