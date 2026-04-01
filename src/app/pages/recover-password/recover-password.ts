import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-recover-password',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './recover-password.html',
  styleUrls: ['./recover-password.css'], 
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

      const users = this.userService.getUsers();

      const userExists = users.find(u => u.email === email);

      if (userExists) {

        console.log("Email encontrado:", email);

        this.mostrarPopup = true;

      } else {

        alert("El email no está registrado");

      }

    }

  }

}