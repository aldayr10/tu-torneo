import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-actualizar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './actualizar.html',
  styleUrl: './actualizar.css'
})
export class Actualizar {

  jugador = {
    nombre: '',
    correo: '',
    password: ''
  };

  actualizarDatos() {
    console.log("Datos actualizados:", this.jugador);
  }

}
