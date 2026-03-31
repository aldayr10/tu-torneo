import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Player {}

export interface Player {
  id: number;
  idUser: number;
  name: string;
  dateBirth: Date;
}

