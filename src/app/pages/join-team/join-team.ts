import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-join-team',
  templateUrl: './join-team.html',
  styleUrls: ['./join-team.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class JoinTeam {

  inviteForm: FormGroup;
  inviteLink: string = 'https://tu-torneo.herokuapp.com/join-team';
  message: string = '';

  constructor(private fb: FormBuilder) {

    this.inviteForm = this.fb.group({
      username: ['', Validators.required]
    });

  }

  sendInvitation() {

    if (this.inviteForm.invalid) {
      return;
    }

    const username = this.inviteForm.value.username;

    // Aquí luego conectarás con tu API
    console.log('Invitación enviada a:', username);

    this.message = `Invitación enviada a ${username}`;

    this.inviteForm.reset();
  }

  copyLink() {

    navigator.clipboard.writeText(this.inviteLink);

    this.message = 'Link copiado al portapapeles';
  }

}