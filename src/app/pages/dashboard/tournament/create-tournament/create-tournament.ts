import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TournamentService } from '../../../../services/tournament.service';
import { CatTypeTeam } from '../../../../services/cat-type-team';


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
export class CreateTournament implements OnInit {

  tournamentForm: FormGroup;
  catalogoTeam: any[] = [];

  constructor(
    private fb: FormBuilder,
    private tournamentService: TournamentService,
    private catalogoTipoEquipo: CatTypeTeam
  ) {


    this.tournamentForm = this.fb.group({
      name: ['', Validators.required],
      category: [0, Validators.required],
      description: ['']
    });

  }

   ngOnInit(): void {
    this.catalogoTeam = this.catalogoTipoEquipo.getCatTypeTournamentTeam()
  }

  crearTorneo() {

    if (this.tournamentForm.valid) {

      const torneo = this.tournamentForm.value;

      this.tournamentService.addTournament(torneo);

      alert('Torneo creado correctamente');

      this.tournamentForm.reset();

      this.tournamentForm.patchValue({
        category:'0'
      })

    }

  }

}