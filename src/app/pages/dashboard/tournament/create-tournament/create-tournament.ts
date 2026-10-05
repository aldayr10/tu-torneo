import { Component,OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
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
  owner: any;
  isSubmitting = false;
  errorMessage = '';
  constructor(
    private fb: FormBuilder,
    private tournamentService: TournamentService,
    private catalogoTipoEquipo: CatTypeTeam,
    private profileService:ProfileService
  ) {
    

    this.tournamentForm = this.fb.group({
      idTournament:['0'],
      idOwner:[''],
      name: ['', [Validators.required, Validators.minLength(2)]],
      categoryId: [0, Validators.required],
      description: [''],
      teams:[[]],
    });

  }

   ngOnInit(): void {
    this.profileService.getProfile().subscribe(data=>{
      this.owner=data
      if (data) this.tournamentForm.patchValue({ idOwner: data.idUser });
    });
    
    this.catalogoTeam = this.catalogoTipoEquipo.getCatTypeTournamentTeam()
  }

  crearTorneo() {
    if (this.isSubmitting) return;
    if (this.tournamentForm.invalid) {
      this.tournamentForm.markAllAsTouched();
      return;
    }

    if (!this.owner) {
      this.errorMessage = 'No se pudo identificar al usuario. Vuelve a iniciar sesión.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    const torneo = this.tournamentForm.getRawValue();
    this.tournamentService.addTournament({
      ...torneo,
      idOwner: this.owner.idUser,
      categoryId: Number(torneo.categoryId),
      estado: 'ABIERTO',
      teams: [],
    }).subscribe({
      next: () => {
        alert('Torneo creado correctamente');
        this.tournamentForm.reset({
          idTournament: '0',
          idOwner: this.owner.idUser,
          name: '',
          categoryId: 0,
          description: '',
          teams: [],
        });
        this.isSubmitting = false;
      },
      error: (error: unknown) => {
        this.isSubmitting = false;
        this.errorMessage = this.getErrorMessage(error);
      },
    });
  }

  private getErrorMessage(error: unknown): string {
    if (error instanceof HttpErrorResponse && error.status === 0) {
      return 'No se pudo conectar con el servidor.';
    }

    const messages = error instanceof HttpErrorResponse
      ? error.error?.message
      : null;
    if (Array.isArray(messages) && messages.length) {
      return messages.join(' ');
    }
    if (typeof messages === 'string') {
      return messages;
    }
    return 'No se pudo crear el torneo. Revisa los datos e inténtalo de nuevo.';
  }

}