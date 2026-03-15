import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';

import { TeamService } from '../../../../services/team';
import { RequestService } from '../../../../services/request';
import { UserService } from '../../../../services/user';
import { Request } from '../../../../models/request';

@Component({
  selector: 'app-create-team',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './create-team.html',
  styleUrl: './create-team.css'
})
export class CreateTeam {

  teamForm: FormGroup;
  usernameInvite: string = '';
  invitedPlayers: Request[] = [];
  teamIdCreated!: number;

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private requestService: RequestService,
    private userService: UserService,
    private dialogRef: MatDialogRef<CreateTeam>
  ) {

    this.teamForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required]
    });

  }

  createTeam() {

  if (this.teamForm.invalid) return;

  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const newTeam = {
    id: 0,
    name: this.teamForm.value.name,
    category: this.teamForm.value.category,
    ownerId: user.id,
    players: []
  };

  // 🔹 Suscribirse al Observable para obtener el equipo creado
  this.teamService.createTeam(newTeam)
    .subscribe((createdTeam) => {
      this.teamIdCreated = createdTeam.id;
      this.dialogRef.close(createdTeam);
    });

}

  closeDialog(){
    this.dialogRef.close();
  }

}