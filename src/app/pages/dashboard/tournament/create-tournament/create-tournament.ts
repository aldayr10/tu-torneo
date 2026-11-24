import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TournamentService } from '../../../../services/tournament.service';
import { CatTypeTeam } from '../../../../services/cat-type-team';
import { ProfileService } from "../../../../services/profile";
import { AuthService } from '../../../../services/auth';
import { Tournament } from '../../../../models/tournament';


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

  @Output() created = new EventEmitter<Tournament>();

  tournamentForm: FormGroup;
  catalogoTeam: any[] = [];
  owner: any;
  currentUserId: number | null = null;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private tournamentService: TournamentService,
    private catalogoTipoEquipo: CatTypeTeam,
    private profileService:ProfileService,
    private authService: AuthService,
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
    this.currentUserId = this.authService.getCurrentUser()?.idUser ?? null;
    if (this.currentUserId) this.tournamentForm.patchValue({ idOwner: this.currentUserId });

    this.profileService.getProfile().subscribe(data=>{
      this.owner = data;
      const userId = data?.idUser ?? this.currentUserId;
      if (userId) {
        this.currentUserId = userId;
        this.tournamentForm.patchValue({ idOwner: userId });
      }
    });
    
    this.catalogoTeam = this.catalogoTipoEquipo.getCatTypeTournamentTeam();
  }

  crearTorneo() {
    if (this.isSubmitting) return;
    if (this.tournamentForm.invalid) {
      this.tournamentForm.markAllAsTouched();
      return;
    }

    const userId = this.currentUserId ?? this.owner?.idUser;
    if (!userId) {
      this.errorMessage = 'No se pudo identificar al usuario. Vuelve a iniciar sesión.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    const torneo = this.tournamentForm.getRawValue();
    this.tournamentService.addTournament({
      ...torneo,
      idOwner: userId,
      categoryId: Number(torneo.categoryId),
      estado: 'ABIERTO',
      teams: [],
    }).subscribe({
      next: (created) => {
        alert('Torneo creado correctamente');
        const userId = this.currentUserId ?? this.owner?.idUser;
        this.tournamentForm.reset({
          idTournament: '0',
          idOwner: userId ?? '',
          name: '',
          categoryId: 0,
          description: '',
          teams: [],
        });
        this.isSubmitting = false;
        this.created.emit(created);
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