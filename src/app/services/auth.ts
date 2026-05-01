import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { USERS } from '../fake-data/users.data';
import { User } from '../models/user';

import { PlayerService } from '../services/player';
import { ProfileService } from '../services/profile';

@Injectable({
  providedIn:'root'
})
export class AuthService {

  private timeout: any;
  private tiempoSesion = 10 * 1000; 

  constructor(
    private profileService: ProfileService,
    private PlayerService: PlayerService,
    private router: Router
  ){}

  login(email:string,password:string){

    const user = USERS.find(
      u => u.email === email && u.password === password
    );

    if(user){

      const player:any = this.PlayerService.getPlayerByIdUser(user.idUser);

      this.profileService.setProfile(player);

      localStorage.setItem('user',JSON.stringify(user));


      this.iniciarContador();

      return true;
    }

    return false;
  }

  logout(){
    localStorage.removeItem('user');

    this.limpiarContador();

    alert("Sesión expirada");

    this.router.navigate(['/login']);
  }

  getCurrentUser():User | null{

    const user = localStorage.getItem('user');

    return user ? JSON.parse(user) : null;
  }


  iniciarContador(){
    this.limpiarContador();

    this.timeout = setTimeout(() => {
      this.logout();
    }, this.tiempoSesion);
  }

  resetearContador(){
    this.iniciarContador();
  }

  limpiarContador(){
    if(this.timeout){
      clearTimeout(this.timeout);
    }
  }

}