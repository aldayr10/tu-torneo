import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-player-join-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './player-join-team.html',
  styleUrls: ['./player-join-team.css']
})
export class PlayerJoinTeam {

  solicitudes = [
    {
      equipo: 'Team Alpha',
      creador: 'Carlos Pérez',
      estado: 'pendiente'
    },
    {
      equipo: 'Team Beta',
      creador: 'Ana Gómez',
      estado: 'pendiente'
    }
  ];

  aceptarSolicitud(solicitud: any) {
    solicitud.estado = 'aceptada';
    console.log('Solicitud aceptada:', solicitud);
  }

  rechazarSolicitud(solicitud: any) {
    solicitud.estado = 'rechazada';
    console.log('Solicitud rechazada:', solicitud);
  }

}
