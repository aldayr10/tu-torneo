import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-profile.html',
  styleUrls: ['./update-profile.css']
})
export class UpdateProfile {

  updateProfileForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private router:Router
  ) {

    this.updateProfileForm = this.fb.group({
      nombre: ['', Validators.required],
      fechaNacimiento: ['', Validators.required]
    });

    const user = this.authService.getCurrentUser();

    if (user) {

      this.updateProfileForm.patchValue({
        nombre: user.name
      });

    }

  }

  onSubmit() {

    if (this.updateProfileForm.valid) {

      const user = this.authService.getCurrentUser();

      if (user) {

        const updatedUser = {
          ...user,
          name: this.updateProfileForm.value.nombre
        };

        this.userService.updateProfile(updatedUser);

        alert("Información actualizada correctamente");
        this.router.navigate(['/dashboard']);
      }

    }

  }

}