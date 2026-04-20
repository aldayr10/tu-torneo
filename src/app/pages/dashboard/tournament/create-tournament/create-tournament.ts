import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TournamentService } from '../../../../services/tournament.service';
import { CatTypeTeam } from '../../../../services/cat-type-team';
import { ProfileService } from "../../../../services/profile";


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
  owner:any
  constructor(
    private fb: FormBuilder,
    private tournamentService: TournamentService,
    private catalogoTipoEquipo: CatTypeTeam,
    private profileService:ProfileService
  ) {
    

    this.tournamentForm = this.fb.group({
      idTournament:['0'],
      idOwner:[''],
      name: ['', Validators.required],
      categoryId: [0, Validators.required],
      description: [''],
      teams:[[]],
    });

  }

   ngOnInit(): void {
    this.profileService.getProfile().subscribe(data=>{
      this.owner=data
    });
    console.log(this.owner);
    this.tournamentForm.patchValue({
        idOwner:this.owner.idPlayer,
    })
    
    this.catalogoTeam = this.catalogoTipoEquipo.getCatTypeTournamentTeam()
  }

  crearTorneo() {

    if (this.tournamentForm.valid) {

      const torneo = this.tournamentForm.value;

      this.tournamentService.addTournament(torneo);

      alert('Torneo creado correctamente');

      this.tournamentForm.reset();

      this.tournamentForm.patchValue({
        idOwner:this.owner.idPlayer,
        categoryId: 0
      })

    }

  }

}