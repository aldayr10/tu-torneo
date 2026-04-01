import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

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
    private router: Router,
    private dialogRef: MatDialogRef<CreateTournament>
  ) {

    this.tournamentForm = this.fb.group({
      name: ['', Validators.required],
      id: ['', Validators.required],
      category: ['', Validators.required],
      team: ['']
    });

  }

  crearTorneo() {

    if (this.tournamentForm.valid) {
      const torneo = this.tournamentForm.value;
      
      alert('Torneo creado correctamente');
      this.tournamentForm.reset();
      this.dialogRef.close(torneo);
    }
  }
  cancelar(){
    this.dialogRef.close();
  }

}