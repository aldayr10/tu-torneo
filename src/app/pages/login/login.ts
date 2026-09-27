import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { PlayerService } from '../../services/player';
import { ProfileService } from '../../services/profile';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {

  loginForm: FormGroup;
  isSubmitting = false;
  errorMessage = '';
  
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private playerService:PlayerService,
    private profile:ProfileService
  ) {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)] ]
    });

  }

  ngOnInit(): void {
    void this.restoreSession();
  }

  async onSubmit(): Promise<void> {
    if (this.isSubmitting) return;
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    const { email, password } = this.loginForm.getRawValue();

    try {
      if (await this.authService.login(email, password)) {
        await this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage = 'No se pudo verificar la sesión. Inténtalo de nuevo.';
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse && error.status === 401) {
        this.errorMessage = 'Correo o contraseña incorrectos.';
      } else if (error instanceof HttpErrorResponse && error.status === 0) {
        this.errorMessage = 'No se pudo conectar con el servidor.';
      } else {
        this.errorMessage = 'No fue posible iniciar sesión. Inténtalo de nuevo.';
      }
    } finally {
      this.isSubmitting = false;
    }
  }

  private async restoreSession(): Promise<void> {
    if (await this.authService.hydrate()) {
      await this.router.navigate(['/dashboard']);
    }
  }

  registrarse() {
    this.router.navigate(['/register']);
  }

  recuperarPassword() {
    this.router.navigate(['/recover-password']);
  }

}