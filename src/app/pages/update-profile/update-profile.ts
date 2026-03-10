import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-profile.html',
  styleUrls: ['./update-profile.css']
})
export class UpdateProfile {

  updateProfileForm: FormGroup;

  constructor(private fb: FormBuilder) {

    this.updateProfileForm = this.fb.group({
      nombre: ['', Validators.required],
      fechaNacimiento: ['', Validators.required]
    });

  }

  onSubmit() {

    if (this.updateProfileForm.valid) {
      console.log("Datos actualizados:", this.updateProfileForm.value);
      alert("Información actualizada correctamente");
    }

  }

}