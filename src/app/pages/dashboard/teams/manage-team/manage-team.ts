import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../../../services/user';
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
  userExists: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private teamService: TeamService,
    private userService: UserService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {

    const teamId = this.data.teamId;

    const teamData = this.teamService.getTeamByIdTeam(teamId);

    if (teamData) {
      this.team = teamData;
    }

    this.inviteForm = this.fb.group({
      useremail: ['', [Validators.required, Validators.email]]
    });

  }

  openInviteForm() {
    this.showInviteForm = true;
  }

  invitePlayer() {

    if (this.inviteForm.valid) {
      let user = this.userService.getUserByEmail(this.inviteForm.value.useremail)
      console.log(user);

      setTimeout(() => {



        if (user == undefined) {

          alert('Usuario No Existe');
        } else {
          this.teamService.invitePlayer(this.team.idTeam, user);

          alert('Invitación enviada');

          this.inviteForm.reset();
          this.showInviteForm = false;
        }

      }, 2000);






    }

  }

  generateInviteLink() {
    this.inviteLink = this.teamService.generateInviteLink(this.team.idTeam);
  }

  copyLink() {
    navigator.clipboard.writeText(this.inviteLink);
    alert('Link copiado');
  }

}