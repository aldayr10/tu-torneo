import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../../services/notification.service';
import { TeamService } from '../../../../services/team';
import { AuthService } from '../../../../services/auth';
import { Notification } from '../../../../models/notification';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrls: ['./notification.css']
})
export class Notifications implements OnInit {

  notifications: Notification[] = [];
  teamInvitations: Notification[] = [];

  constructor(
    private authService: AuthService,
    private notificationService: NotificationService,
    private teamService: TeamService
  ) { }

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return;
    this.notificationService.markAllAsRead(currentUser.idUser);
    this.notificationService.getUserNotifications(currentUser.idUser).subscribe(notifications => {
      this.notifications = notifications;
      this.teamInvitations = notifications.filter(notification =>
        notification.type === 'team_invitation');
    });
  }

  acceptInvitation(notification: Notification) { const team = this.teamService.getTeamByIdTeam(notification.teamId!); const user = this.authService.getCurrentUser(); if (!team || !user) return; this.teamService.acceptInvitation(team, user); this.notificationService.removeNotification( notification.idNotification ); }

  declineInvitation(notification: Notification) {
    const team = this.teamService.getTeamById(notification.teamId!);
    const user = this.authService.getCurrentUser();
    if (!team || !user) return;
    this.teamService.rejectInvitation(team, user);
    this.notificationService.removeNotification(notification.idNotification);
  }
}