import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-request-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './request-status.html',
  styleUrls: ['./request-status.css']
})
export class RequestStatus {

  solicitudes = [
    {
      nombre: 'Carlos Pérez',
      email: 'carlos@email.com',
      estado: 'pendiente'
    },
    {
      nombre: 'Ana Gómez',
      email: 'ana@email.com',
      estado: 'aceptada'
    },
    {
      nombre: 'Luis Rodríguez',
      email: 'luis@email.com',
      estado: 'rechazada'
    }
  ];

}
