import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-games',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-games.html',
  styleUrls: ['./view-games.css']
})
export class ViewGames {

  torneos: any[] = [];

  totalPartidos = 0;
  totalEquipos = 0;

  constructor(private router: Router) {
    this.cargarDatos();
  }

  cargarDatos() {

    // Simulación (puedes cambiar por tu servicio real)
    this.torneos = [
      {
        nombre: 'Torneo Demo',
        categoria: 'A',
        tipo: 'Fútbol 11',
        equipos: ['Equipo 1', 'Equipo 2'],
        partidos: [
          { equipo1: 'Equipo 1', equipo2: 'Equipo 2' }
        ]
      }
    ];

    this.totalPartidos = this.torneos.reduce((acc, t) => acc + t.partidos.length, 0);
    this.totalEquipos = this.torneos.reduce((acc, t) => acc + t.equipos.length, 0);
  }

  volver(){
    this.router.navigate(['/dashboard']);
  }

}