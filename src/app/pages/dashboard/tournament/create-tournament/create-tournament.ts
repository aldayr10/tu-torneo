import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TournamentService } from '../../../../services/tournament.service';
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

  constructor(
    private fb: FormBuilder,
    private tournamentService: TournamentService
  ) {

    this.tournamentForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      description: ['']
    });

  }

  crearTorneo() {

    if (this.tournamentForm.valid) {

      const torneo = this.tournamentForm.value;

      this.tournamentService.addTournament(torneo);

      alert('Torneo creado correctamente');

      this.tournamentForm.reset();

    }

  }

}