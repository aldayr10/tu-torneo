import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TeamService } from '../../../../services/team';
import { RequestService } from '../../../../services/request';
import { UserService } from '../../../../services/user';
import { Request } from '../../../../models/request';
import { Router } from '@angular/router'
import { log } from 'node:console';

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
    private router:Router

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

    console.log(newTeam);
    
    const createdTeam = this.teamService.createTeam(newTeam);
    this.teamIdCreated = createdTeam.id;
    this.teamForm.reset();

  }

  

}