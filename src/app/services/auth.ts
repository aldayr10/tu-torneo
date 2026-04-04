import { Injectable } from '@angular/core';
import { USERS } from '../fake-data/users.data';
import { User } from '../models/user';

import { PlayerService } from '../services/player';
import { Profile } from '../services/profile';
import { Player } from '../models/player';
import { log } from 'console';
@Injectable({
  providedIn:'root'
})
export class AuthService {
  constructor(private profileService:Profile,private PlayerService:PlayerService){
    
  }
  login(email:string,password:string){

    const user = USERS.find(
      u => u.email === email && u.password === password
    );

    if(user){
      console.log(user);
      
      const player:any = this.PlayerService.getPlayerByIdUser(user.idUser)
      console.log(player);
      
      this.profileService.setProfile(player)
      console.log(this.profileService.getProfile());
      
      localStorage.setItem('user',JSON.stringify(user));
      
      return true;
    }

    return false;

  }

  logout(){
    localStorage.removeItem('user');
  }

  getCurrentUser():User | null{

    const user = localStorage.getItem('user');

    return user ? JSON.parse(user) : null;

  }

}