import { Injectable } from '@angular/core';
import { Player } from "./../models/player";
import { PlayerService } from "./../services/player";
import { log } from 'console';

@Injectable({
  providedIn: 'root',
})
export class Profile {
  
  player:any;

  constructor(
    private playerService:PlayerService,
  ){

  }

  setProfile(player:Player){
    this.player=player;
  }

  getProfile(){
    return this.player;
  }




}
