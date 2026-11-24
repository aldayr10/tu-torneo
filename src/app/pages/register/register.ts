import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user';
import { PlayerService } from '../../services/player';
import { Player } from '../../models/player';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {

  registerForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private playerService: PlayerService,
    private authService: AuthService,
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

  async onSubmit() {
    if (this.isSubmitting) return;
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    const formValue = this.registerForm.getRawValue();

    const newUser = {
      name: formValue.nombre,
      email: formValue.email,
      password: formValue.password
    };

    this.userService.register(newUser).subscribe({
      next: user => {
        void this.completeRegistration(user, formValue);
      },
      error: (err) => {
        this.isSubmitting = false;
        this.errorMessage = err?.error?.message || 'No se pudo registrar el usuario. Verifica los datos e inténtalo de nuevo.';
      },
    });
  }

  private async completeRegistration(user: any, formValue: any): Promise<void> {
    try {
      // Inicia sesión para poder crear el perfil de jugador (endpoint protegido).
      await this.authService.login(formValue.email, formValue.password);

      const newPlayer: Player = {
        idPlayer: 0,
        idUser: user.idUser,
        name: formValue.nombre,
        dateBirth: formValue.fechaNacimiento,
      };

      this.playerService.createPlayer(newPlayer).subscribe({
        next: () => {
          alert('Registro exitoso');
          void this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.isSubmitting = false;
          this.errorMessage = err?.error?.message || 'El usuario se creó, pero no se pudo crear el perfil de jugador.';
          void this.router.navigate(['/dashboard']);
        },
      });
    } catch (err: any) {
      this.isSubmitting = false;
      this.errorMessage = 'El usuario se creó, pero no se pudo iniciar sesión automáticamente. Inicia sesión para completar tu perfil.';
      void this.router.navigate(['/login']);
    }
  }

}
