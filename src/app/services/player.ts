import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Player } from '../models/player';
import { API_BASE_URL } from '../core/api-config';


@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  createPlayer(player: Pick<Player, 'idUser' | 'name' | 'dateBirth'>): Observable<Player> {
    return this.http.post<Player>(`${this.baseUrl}/player`, player);
  }

  getPlayerByIdUser(userId: number): Observable<Player> {
    return this.http.get<Player>(`${this.baseUrl}/player/user/${userId}`);
  }

  updateProfile(updatedPlayer: Player): Observable<Player> {
    return this.http.patch<Player>(`${this.baseUrl}/player/${updatedPlayer.idPlayer}`, {
      name: updatedPlayer.name,
      idUser: updatedPlayer.idUser,
      dateBirth: updatedPlayer.dateBirth,
    });
  }
}

