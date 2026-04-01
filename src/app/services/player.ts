import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Player } from '../models/player';
import { PLAYERS_ } from '../fake-data/player.data';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private players: Player[] = PLAYERS_;
    private playerSource = new BehaviorSubject<Player[]>([]);
    players$ = this.playerSource.asObservable();
  
  
    createPlayer(player: Player) {
      player.id = this.players.length + 1;
      this.players.push(player);
      this.playerSource.next(this.players);
      return player;
    }
    
    getPlayerById(playerId: number): Player | undefined {
      return this.players.find(player => player.id === playerId);
    }

    
  updateProfile(updatedPlayer: Player){
    let findPlayer = this.players.find(player => player.id === updatedPlayer.id);
    
    if(findPlayer){
      findPlayer['name'] = updatedPlayer.name;
      findPlayer['dateBirth'] = updatedPlayer.dateBirth;
    }
  }
}

