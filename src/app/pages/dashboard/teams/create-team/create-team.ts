import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TeamService } from '../../../../services/team';
import { CatTypeTeam } from '../../../../services/cat-type-team';
import { ProfileService } from "../../../../services/profile";
import { AuthService } from '../../../../services/auth';
import { Team } from '../../../../models/team';

@Component({
  selector: 'app-create-team',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './create-team.html',
  styleUrl: './create-team.css'
})
export class CreateTeam implements OnInit {

  @Output() created = new EventEmitter<Team>();

  teamForm: FormGroup;
  catalogoTeam: any[] = [];
  isDragging = false;
  imagePreview: string | null = null;
  owner: any;
  currentUserId: number | null = null;
  isSubmitting = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private catalogoTipoEquipo: CatTypeTeam,
    private profileService: ProfileService,
    private authService: AuthService,
  ) {

    this.teamForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      ownerId: [''],
      categoryId: [null as number | null, [Validators.required]],
      primaryColor: ['#000000'],
      alternativeColor: ['#000000'],
    });

    this.catalogoTeam = this.catalogoTipoEquipo.getCatTypeTournamentTeam();
  }

  ngOnInit(): void {
    this.currentUserId = this.authService.getCurrentUser()?.idUser ?? null;
    if (this.currentUserId) this.teamForm.patchValue({ ownerId: this.currentUserId });

    this.profileService.getProfile().subscribe(profile => {
      this.owner = profile;
      const userId = profile?.idUser ?? this.currentUserId;
      if (userId) {
        this.currentUserId = userId;
        this.teamForm.patchValue({ ownerId: userId });
      }
    });
  }

  resetForm() {
    const userId = this.currentUserId ?? this.owner?.idUser ?? '';
    this.teamForm.reset({
      name: '',
      ownerId: userId,
      categoryId: null,
      primaryColor: '#000000',
      alternativeColor: '#000000',
    });
    this.imagePreview = null;
  }

  createTeam() {
    if (this.isSubmitting) return;
    if (this.teamForm.invalid) {
      this.teamForm.markAllAsTouched();
      return;
    }

    const userId = this.currentUserId ?? this.owner?.idUser;
    if (!userId) {
      this.errorMessage = 'No se pudo identificar al usuario. Vuelve a iniciar sesión.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const raw = this.teamForm.getRawValue();
    const newTeam = {
      idTeam: 0,
      name: raw.name,
      categoryId: Number(raw.categoryId),
      ownerId: userId,
      primaryColor: raw.primaryColor,
      alternativeColor: raw.alternativeColor,
      image: this.imagePreview ?? '',
      invitationCode: '',
      players: [],
      pendingInvitations: [],
    } as unknown as Team;

    this.teamService.createTeam(newTeam).subscribe({
      next: createdTeam => {
        alert('Equipo creado correctamente');
        this.resetForm();
        this.isSubmitting = false;
        this.created.emit(createdTeam);
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
    const messages = error instanceof HttpErrorResponse ? error.error?.message : null;
    if (Array.isArray(messages) && messages.length) return messages.join(' ');
    if (typeof messages === 'string') return messages;
    return 'No se pudo crear el equipo. Revisa los datos e inténtalo de nuevo.';
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;

    const file = event.dataTransfer?.files[0];
    if (file && file.type.startsWith('image/')) {
      this.handleFile(file);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files?.[0];
    if (file) {
      this.handleFile(file);
    }
  }

  handleFile(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = typeof reader.result === 'string' ? reader.result : null;
    };
    reader.readAsDataURL(file);
  }

}
