import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
  
})
export class Login {
    loginForm: FormGroup;

  constructor(private fb: FormBuilder,private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login:', this.loginForm.value);
      alert('Login correcto (simulado)');
      this.router.navigate(['/create-team']);
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  registrarse() {
    this.router.navigate(['/register']);
  }
}
