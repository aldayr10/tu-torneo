import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { CheckEmail } from './check-email/check-email';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

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

  constructor(private fb: FormBuilder) {
    this.recoverForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  recoverPassword() {
    console.log(this.recoverForm.value);
    this.mostrarPopup = true;
  }
}
