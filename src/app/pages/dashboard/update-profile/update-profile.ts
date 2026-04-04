import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PlayerService } from '../../../services/player';
import { Profile } from '../../../services/profile';
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
    private playerService: PlayerService,
    private profileService:Profile
  ) {

    this.updateProfileForm = this.fb.group({
      idPlayer: ['', Validators.required],
      nombre: ['', Validators.required],
      fechaNacimiento: ['', Validators.required]
    });
  }

  goToDAshboard(){
    this.router.navigate(['/dashboard']);
  }

  ngOnInit(): void {
    const user=this.profileService.getProfile()
    this.player = this.playerService.getPlayerByIdUser(user.idUser);
    console.log(this.player);
    
    this.updateProfileForm.patchValue({
      idPlayer:this.player.idPlayer,
      nombre: this.player.name, 
      fechaNacimiento: this.player.dateBirth ? new Date(this.player.dateBirth).toISOString().substring(0, 10) : ''
    });
    
    
  }

  onSubmit() {

  if (this.updateProfileForm.valid) {

    if (this.player) {

      const updatedPlayer = {
        idPlayer: this.player.idPlayer,
        idUser: this.player.idUser,
        name: this.updateProfileForm.value.nombre,
        dateBirth: new Date(this.updateProfileForm.value.fechaNacimiento)
      };

      this.playerService.updateProfile(updatedPlayer);

      alert("Información actualizada correctamente");
      console.log(this.profileService.getProfile());
      this.router.navigate(['/dashboard']);
      }
    }
  }
}
