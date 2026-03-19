import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-tournament',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './create-tournament.html',
  styleUrls: ['./create-tournament.css']
})
export class CreateTournament {

  tournamentForm: FormGroup;

  torneos: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {

    this.tournamentForm = this.fb.group({
      nombre: ['', Validators.required],
      fecha: ['', Validators.required]
    });

  }

  crearTorneo() {

    if (this.tournamentForm.valid) {

      const torneo = this.tournamentForm.value;

      this.torneos.push(torneo);

      alert('Torneo creado correctamente');

      this.tournamentForm.reset();

      console.log(this.torneos);

    }

  }

}