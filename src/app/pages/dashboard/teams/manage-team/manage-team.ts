import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { TeamService } from '../../../../services/team';
import { Team } from '../../../../models/team';

@Component({
  selector: 'app-manage-team',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './manage-team.html',
  styleUrl: './manage-team.css'
})
export class ManageTeam implements OnInit {

  team!: Team;
  inviteForm!: FormGroup;
  inviteLink: string = '';
  showInviteForm: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private teamService: TeamService,
    private fb: FormBuilder
  ) {}

 ngOnInit() {

  const teamId = this.data.teamId;

  // 🔹 Suscribirse al Observable para obtener el equipo
  this.teamService.getTeamById(teamId)
    .subscribe((teamData: Team) => {
      this.team = teamData;
    });

  this.inviteForm = this.fb.group({
    username: ['', Validators.required]
  });

}

  openInviteForm(){
    this.showInviteForm = true;
  }

  invitePlayer(){

    if(this.inviteForm.valid){

      const username = this.inviteForm.value.username;

      const playerId = Math.floor(Math.random() * 100);

      this.teamService.invitePlayer(this.team.id, playerId);

      alert('Invitación enviada');

      this.inviteForm.reset();
      this.showInviteForm = false;

    }

  }

  generateInviteLink(){
    this.inviteLink = this.teamService.generateInviteLink(this.team.id);
  }

  copyLink(){
    navigator.clipboard.writeText(this.inviteLink);
    alert('Link copiado');
  }

}