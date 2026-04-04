import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RequestService } from '../../../../../services/request';
import { UserService } from '../../../../../services/user';
import { Request } from '../../../../../models/request';

@Component({
  selector: 'app-join-team',
  standalone: true,
  templateUrl: './join-team.html',
  styleUrls: ['./join-team.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class JoinTeam {

  @Input() teamId!: number;

  inviteForm: FormGroup;
  inviteLink: string = '';
  message: string = '';

  constructor(
    private fb: FormBuilder,
    private requestService: RequestService,
    private userService: UserService
  ) {

    this.inviteForm = this.fb.group({
      username: ['', Validators.required]
    });

  }

  ngOnInit() {

    this.inviteLink = `http://localhost:4200/join-team/${this.teamId}`;

  }

  sendInvitation() {

    if (this.inviteForm.invalid) {
      return;
    }

    const username = this.inviteForm.value.username;

    const user = this.userService.getUserByUsername(username);

    if (!user) {
      this.message = 'Usuario no encontrado';
      return;
    }

    const newRequest: Request = {
      id: 0, 
      teamId: this.teamId,
      playerId: user.idUser,
      playerName: user.name,
      status: 'Pendiente'
    };

    this.requestService.sendRequest(newRequest);

    this.message = `Invitación enviada a ${username}`;

    this.inviteForm.reset();
    
  }

  copyLink() {

    navigator.clipboard.writeText(this.inviteLink);

    this.message = 'Link copiado al portapapeles';

  }

}