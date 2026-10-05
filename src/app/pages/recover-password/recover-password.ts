import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user';
import { Router } from '@angular/router';
import { CheckEmail } from './check-email/check-email';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, CheckEmail],
  templateUrl: './recover-password.html',
  styleUrls: ['./recover-password.css']
})
export class RecoverPassword {

  recoverForm: FormGroup;
  mostrarPopup: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {

    this.recoverForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

  }

  recoverPassword() {

    if (this.recoverForm.valid) {

      const email = this.recoverForm.value.email;

      this.userService.getUserByEmail(email).subscribe({
        next: user => {
          if (user) this.mostrarPopup = true;
          else alert('El email no está registrado');
        },
        error: () => alert('No se pudo verificar el email con el servidor.'),
      });

    }

  }

  volverLogin(){
    this.router.navigate(['/login']);
  }

}