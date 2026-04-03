import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../../../../services/request';
import { Request } from '../../../../../models/request';

@Component({
  selector: 'app-player-join-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-join-team.html',
  styleUrls: ['./player-join-team.css']
})
export class addPlayerTeam {

  solicitudes: Request[] = [];
  userId!: number;

  constructor(private requestService: RequestService) {

    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = user.id;

    this.cargarSolicitudes();
  }

  cargarSolicitudes() {

    const todasLasSolicitudes = this.requestService.getAllRequests();
    this.solicitudes = todasLasSolicitudes.filter(
      solicitud => solicitud.playerId === this.userId
    );

  }

  aceptarSolicitud(solicitud: Request) {

    this.requestService.updateRequestStatus(solicitud.id, 'Aceptada');

    solicitud.status = 'Aceptada';

    console.log('Solicitud aceptada:', solicitud);

  }

  rechazarSolicitud(solicitud: Request) {

    this.requestService.updateRequestStatus(solicitud.id, 'Rechazada');

    solicitud.status = 'Rechazada';

    console.log('Solicitud rechazada:', solicitud);

  }

}