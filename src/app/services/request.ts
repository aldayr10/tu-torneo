import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from './notification.service';
import { TeamService } from './team';
import { Request } from "../models/request";

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private requests: Request[] =
  JSON.parse(localStorage.getItem('requests') || '[]');

  private requests$ = new BehaviorSubject<Request[]>(this.requests);

  constructor(
    private notificationService: NotificationService,
    private teamService: TeamService
  ) {}

  getRequests() {
    return this.requests$.asObservable();
  }

  getRequestsByTeam(idTeam: number) {
    return this.requests.filter(r => r.idTeam === idTeam);
  }

  getRequestsByPlayer(idPlayer: number) {
    return this.requests.filter(r => r.idPlayer === idPlayer);
  }

  createRequest(request: Omit<Request, 'idRequest' | 'status' | 'createdAt'>) {

    const newRequest: Request = {
      ...request,
      idRequest: Date.now(),
      status: 'Pendiente',
      createdAt: new Date()
    };

    const exists = this.requests.some(r =>
      r.idTeam === newRequest.idTeam &&
      r.idPlayer === newRequest.idPlayer &&
      r.status === 'Pendiente'
    );

    if (exists) return;

    this.requests.push(newRequest);


    const team = this.teamService.getTeamByIdTeam(newRequest.idTeam);

    if (!team) return;

    if (newRequest.type === 'Unirse') {

      this.notificationService.createNotification(
        team.ownerId,
        'Tienes una nueva solicitud para unirse a tu equipo'
      );
    }

    if (newRequest.type === 'Invitar') {

      this.notificationService.createNotification(
        newRequest.idPlayer,
        `Has sido invitado al equipo ${team.name}`
      );
    }

    this.update();
  }

  updateStatus(idRequest: number, status: 'Aceptada' | 'Rechazada') {

    const req = this.requests.find(r => r.idRequest === idRequest);
    if (!req) return;

    req.status = status;

    const team = this.teamService.getTeamByIdTeam(req.idTeam);

    if (status === 'Aceptada') {

      this.notificationService.createNotification(
        req.idPlayer,
        `Fuiste aceptado en el equipo ${team?.name}`
      );

    } else {

      this.notificationService.createNotification(
        req.idPlayer,
        `Tu solicitud fue rechazada en ${team?.name}`
      );
    }

    this.update();
  }

  getPendingCount(): number {
    return this.requests.filter(r => r.status === 'Pendiente').length;
  }

  private update() {
    localStorage.setItem('requests', JSON.stringify(this.requests));
    this.requests$.next([...this.requests]);
  }

}