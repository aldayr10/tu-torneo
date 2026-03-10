import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  jugador = {
    nombre: '',
    correo: '',
    password: '',
    confirmar: ''
  };

  registrar() {
    console.log("Jugador registrado:", this.jugador);
  }

}