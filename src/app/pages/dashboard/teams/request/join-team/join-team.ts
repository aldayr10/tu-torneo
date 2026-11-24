import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { RequestService } from '../../../../../services/request';

@Component({
  selector: 'app-join-team',
  standalone: true,
  templateUrl: './join-team.html',
  styleUrls: ['./join-team.css'],
  imports: [ReactiveFormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class JoinTeam {
  form: FormGroup;
  error = '';
  success = '';

  constructor(
    private fb: FormBuilder,
    private requestService: RequestService,
    private dialogRef: MatDialogRef<JoinTeam>,
    @Inject(MAT_DIALOG_DATA) public data: { team: any }
  ) {
    this.form = this.fb.group({
      playerId: ['', [Validators.required, Validators.min(1)]],
    });
  }

  sendInvite() {
    if (this.form.invalid || !this.data?.team?.idTeam) return;
    const playerId = Number(this.form.value.playerId);
    this.requestService.createRequest({
      idTeam: this.data.team.idTeam,
      idPlayer: playerId,
      type: 'Invitar',
    }).subscribe({
      next: () => {
        this.success = 'Invitación enviada correctamente.';
        this.error = '';
        this.form.reset();
      },
      error: (err) => {
        this.error = err?.error?.message || 'No se pudo enviar la invitación.';
        this.success = '';
      },
    });
  }

  cancelSelection() {
    this.dialogRef.close();
  }
}
