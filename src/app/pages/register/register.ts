import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user';
import { PlayerService } from '../../services/player';
import { Player } from '../../models/player';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private playerService:PlayerService
  ) {

    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      nombre: ['', Validators.required],
      fechaNacimiento: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });

  }

  passwordMatchValidator(control: AbstractControl) {

    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;

  }

  onSubmit() {

    if (this.registerForm.valid) {

      const formValue = this.registerForm.value;

      const newUser = {
        name: formValue.nombre,
        email: formValue.email,
        password: formValue.password
      };
      this.userService.register(newUser).subscribe({
        next: user => {
          const newPlayer: Player = {
            idPlayer: 0,
            idUser: user.idUser,
            name: formValue.nombre,
            dateBirth: formValue.fechaNacimiento,
          };
          this.playerService.createPlayer(newPlayer).subscribe({
            next: () => {
              alert('Registro exitoso');
              void this.router.navigate(['/login']);
            },
            error: () => alert('El usuario se creó, pero no se pudo crear el perfil de jugador.'),
          });
        },
        error: () => alert('No se pudo registrar el usuario. Verifica los datos e inténtalo de nuevo.'),
      });

    }

  }

}