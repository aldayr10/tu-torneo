import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-team',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-team.html',
  styleUrls: ['./delete-team.css']
})
export class DeleteTeam {

  equipos = [
    { nombre: 'Team Alpha' },
    { nombre: 'Team Beta' },
    { nombre: 'Team Gamma' }
  ];

  constructor(private router: Router) {}

  eliminarEquipo(index: number) {

    const confirmacion = confirm('¿Seguro que deseas eliminar este equipo?');

    if (confirmacion) {

      this.equipos.splice(index, 1);

      alert('Equipo eliminado correctamente');

      // redirección después de eliminar
      this.router.navigate(['/teams']);

    }

  }

}