import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../../../../services/request';
import { Request } from '../../../../../models/request';
import { UserService } from '../../../../../services/user';

@Component({
  selector: 'app-player-join-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-join-team.html',
  styleUrls: ['./player-join-team.css']
})
export class PlayerJoinTeam implements OnInit {

  solicitudes: Request[] = [];
  userId!: number;

  constructor(
    private requestService: RequestService,
    private userService: UserService
  ) {}

  ngOnInit() {
    // Obtener usuario actual desde UserService
    const currentUser = this.userService.getCurrentUser();
    if (currentUser) {
      this.userId = currentUser.id;
    }

    // Cargar solicitudes del jugador
    this.cargarSolicitudes();
  }

  cargarSolicitudes() {
    // Ahora usamos Observable del backend
    this.requestService.getRequestsByPlayer(this.userId)
      .subscribe((requests: Request[]) => {
        // Solo dejamos las solicitudes de este jugador
        this.solicitudes = requests;
      });
  }

  aceptarSolicitud(solicitud: Request) {
    this.requestService.updateRequestStatus(solicitud.id, 'Aceptada')
      .subscribe(() => {
        solicitud.status = 'Aceptada';
        console.log('Solicitud aceptada:', solicitud);
      });
  }

  rechazarSolicitud(solicitud: Request) {
    this.requestService.updateRequestStatus(solicitud.id, 'Rechazada')
      .subscribe(() => {
        solicitud.status = 'Rechazada';
        console.log('Solicitud rechazada:', solicitud);
      });
  }

}