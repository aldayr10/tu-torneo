import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { CreateTournament} from "./create-tournament/create-tournament";
import { ViewCreatedTournament } from "./view-created-tournament/view-created-tournament";

@Component({
  selector: 'app-tournament',
  imports: [CreateTournament,ViewCreatedTournament],
  standalone:true,
  templateUrl: './tournament.html',
  styleUrl: './tournament.css',
})
export class Tournament {
  @ViewChild(ViewCreatedTournament) viewCreatedTournament?: ViewCreatedTournament;

  constructor(
    private router:Router
  ){

   }

  goToDAshboard(){
    this.router.navigate(['/dashboard']);
  }

  onTournamentCreated() {
    this.viewCreatedTournament?.loadMyTournaments();
  }
}
