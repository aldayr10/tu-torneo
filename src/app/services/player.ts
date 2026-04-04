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



  createPlayer(player: Player) {
    player.idPlayer = this.players.length + 1;
    this.players.push(player);
    this.playerSource.next(this.players);
    return player;
  }

  getPlayerByIdUser(playerId: number): Player | undefined {
    console.log();
    return this.players.find(player => player.idUser === playerId);
  }


  updateProfile(updatedPlayer: Player) {
    console.log(updatedPlayer);
    
    let findPlayer = this.players.find(player => player.idPlayer === updatedPlayer.idPlayer);
    if (findPlayer) {
      findPlayer['name'] = updatedPlayer.name;
      findPlayer['dateBirth'] = updatedPlayer.dateBirth;
    }
  }
}

