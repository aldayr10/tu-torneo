import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TeamService } from '../../services/team';

@Component({
  selector: 'app-create-team',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-team.html',
  styleUrl: './create-team.css'
})
export class CreateTeam {

  teamForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService
  ) {

    this.teamForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required]
    });

  }

  createTeam() {

    if (this.teamForm.valid) {

      const newTeam = {
        id: 0,
        name: this.teamForm.value.name,
        category: this.teamForm.value.category,
        players: []
      };

      this.teamService.createTeam(newTeam);

      alert("Equipo creado");

      this.teamForm.reset();

    }

  }

}