import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Player } from '../models/player';
import { log } from 'console';

@Injectable({
  providedIn: 'root',
})
export class Profile {
  
  private profileSource = new BehaviorSubject<Player | null>(null);

  profile$ = this.profileSource.asObservable();

  setProfile(player:any) {
    this.profileSource.next(player);
  }

  getProfile() {
    return this.profile$;
  }
}