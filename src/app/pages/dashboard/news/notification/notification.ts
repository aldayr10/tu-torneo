import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../../../services/request';
import { NotificationService } from '../../../../services/notification.service';
import { TeamService } from '../../../../services/team';



@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.html',
  styleUrls: ['./notification.css']
})
export class Notification implements OnInit {

  requests: any[] = [];
  notifications: any[] = [];
  user: any;

  constructor(
    private requestService: RequestService,
    private notificationService: NotificationService,
    private teamService: TeamService
  ) {}

  ngOnInit() {

    this.user = JSON.parse(localStorage.getItem('user') || '{}');

    this.loadRequests();

    this.notificationService.getNotifications(this.user.idPlayer)
      .subscribe(n => this.notifications = n);

  }

  loadRequests() {
    this.requestService.getRequests()
      .subscribe(r => {
        this.requests = r.filter(x => x.status === 'Pendiente');
      });
  }

  accept(req: any) {
    this.requestService.updateStatus(req.idRequest, 'Aceptada');

    this.teamService.addPlayerToTeam(req.idTeam, {
      idPlayer: req.idPlayer,
      name: 'Jugador'
    });

    this.notificationService.createNotification(
      req.idPlayer,
      'Has sido aceptado en el equipo'
    );

    this.loadRequests();
  }

  reject(req: any) {
    this.requestService.updateStatus(req.idRequest, 'Rechazada');

    this.notificationService.createNotification(
      req.idPlayer,
      'Solicitud rechazada'
    );

    this.loadRequests();
  }

}