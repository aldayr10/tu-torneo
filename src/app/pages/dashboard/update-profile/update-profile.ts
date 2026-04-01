import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PlayerService } from '../../../services/player';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './update-profile.html',
  styleUrls: ['./update-profile.css']
})

export class UpdateProfile implements OnInit {

  updateProfileForm: FormGroup;
  player:any

  constructor(
    private fb: FormBuilder,
    private router:Router,
    private playerService: PlayerService
  ) {

    this.updateProfileForm = this.fb.group({
      nombre: ['', Validators.required],
      fechaNacimiento: ['', Validators.required]
    });
  }

  goToDAshboard(){
    this.router.navigate(['/dashboard']);
  }

  ngOnInit(): void {
    
    const userString = localStorage.getItem('user');
    const idUser = userString ? JSON.parse(userString).id : null;
    this.player = this.playerService.getPlayerById(idUser);
    this.updateProfileForm.patchValue({
      nombre: this.player.name, 
      fechaNacimiento: this.player.dateBirth ? new Date(this.player.dateBirth).toISOString().substring(0, 10) : ''
    });
    console.log("PLAYER EN NAVBAR:", this.player);
  }

  onSubmit() {

  if (this.updateProfileForm.valid) {

    if (this.player) {

      const updatedPlayer = {
        id: this.player.id,
        idUser: this.player.idUser,
        name: this.updateProfileForm.value.nombre,
        dateBirth: new Date(this.updateProfileForm.value.fechaNacimiento)
      };

      this.playerService.updateProfile(updatedPlayer);

      alert("Información actualizada correctamente");

      this.router.navigate(['/dashboard']);
      }
    }
  }
}
