import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-player-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-player-team.html',
  styleUrls: ['./delete-player-team.css']
})
export class DeletePlayerTeam {

  jugadores = [
    {
      nombre: 'Juan Pérez',
      email: 'juan@email.com'
    },
    {
      nombre: 'Laura Gómez',
      email: 'laura@email.com'
    },
    {
      nombre: 'Carlos Ruiz',
      email: 'carlos@email.com'
    }
  ];

  eliminarJugador(index: number) {

    const confirmacion = confirm('¿Seguro que deseas eliminar este jugador del equipo?');

    if (confirmacion) {
      this.jugadores.splice(index, 1);
    }

  }

}