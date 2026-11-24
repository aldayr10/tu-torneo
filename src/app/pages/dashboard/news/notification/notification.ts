import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin, of, switchMap } from 'rxjs';
import { NotificationService } from '../../../../services/notification.service';
import { RequestService } from '../../../../services/request';
import { AuthService } from '../../../../services/auth';
import { PlayerService } from '../../../../services/player';
import { Notification } from '../../../../models/notification';
import { Request } from '../../../../models/request';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrls: ['./notification.css']
})
export class Notifications implements OnInit {
  notifications: Notification[] = [];
  pendingInvitations: Request[] = [];
  loading = false;

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private requestService: RequestService,
    private playerService: PlayerService,
  ) { }

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return;

    this.loading = true;
    this.notificationService.markAllAsRead(currentUser.idUser).subscribe({
      next: () => this.loadData(),
      error: () => this.loadData(),
    });
  }

  private loadData(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.loading = false;
      return;
    }

    this.notificationService.getNotifications().subscribe({
      next: notifications => {
        this.notifications = notifications.filter(n => n.type !== 'team_invitation');
      },
      error: () => { this.notifications = []; }
    });

    this.playerService.getPlayerByIdUser(currentUser.idUser).pipe(
      switchMap(player => this.requestService.getRequestsByPlayer(player.idPlayer)),
    ).subscribe({
      next: requests => {
        this.pendingInvitations = requests.filter(r => r.type === 'Invitar' && r.status === 'Pendiente');
        this.loading = false;
      },
      error: () => {
        // fallback: load all involved requests
        this.requestService.getRequests().subscribe({
          next: requests => {
            this.pendingInvitations = requests.filter(r => r.type === 'Invitar' && r.status === 'Pendiente');
            this.loading = false;
          },
          error: () => { this.pendingInvitations = []; this.loading = false; }
        });
      }
    });
  }

  acceptInvitation(request: Request) {
    this.requestService.updateStatus(request.idRequest, 'Aceptada').subscribe({
      next: () => this.loadData(),
      error: () => this.loadData(),
    });
  }

  declineInvitation(request: Request) {
    this.requestService.updateStatus(request.idRequest, 'Rechazada').subscribe({
      next: () => this.loadData(),
      error: () => this.loadData(),
    });
  }

  removeNotification(notification: Notification) {
    this.notificationService.removeNotification(notification.idNotification).subscribe({
      next: () => this.loadData(),
      error: () => this.loadData(),
    });
  }
}
