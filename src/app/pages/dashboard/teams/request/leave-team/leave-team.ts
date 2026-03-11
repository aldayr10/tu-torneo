import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-leave-team',
  standalone: true,
  templateUrl: './leave-team.html',
  styleUrls: ['./leave-team.css'],
  imports: [ReactiveFormsModule, CommonModule]

})
export class LeaveTeam {

  leaveForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder) {

    this.leaveForm = this.fb.group({
      username: ['', Validators.required]
    });

  }

  leaveTeam() {

    if (this.leaveForm.invalid) {
      return;
    }

    const username = this.leaveForm.value.username;

    console.log('Jugador salió del equipo:', username);

    this.message = `${username} ha salido del equipo`;

    this.leaveForm.reset();
  }

}