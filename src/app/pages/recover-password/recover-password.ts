import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CheckEmail } from './check-email/check-email';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user';
import { User } from '../../models/user';

@Component({
  selector: 'app-recover-password',
  imports: [ReactiveFormsModule, CheckEmail, CommonModule],
  templateUrl: './recover-password.html',
  styleUrl: './recover-password.css',
  standalone: true,
})
export class RecoverPassword {

  recoverForm: FormGroup;
  mostrarPopup: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {

    this.recoverForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

  }

 recoverPassword() {

  if (this.recoverForm.valid) {

    const email = this.recoverForm.value.email;

    this.userService.getUsers().subscribe((users: User[]) => {

      const userExists = users.find(u => u.email === email);

      if (userExists) {

        console.log("Email encontrado:", email);
        this.mostrarPopup = true;

      } else {

        alert("El email no está registrado");

      }

    });

  }

}

}