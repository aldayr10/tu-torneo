import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavBar } from "./nav-bar/nav-bar";
import { TournamentService } from '../../services/tournament.service';
import { ProfileService } from '../../services/profile';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tournament } from '../../models/tournament';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  imports: [NavBar,CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit{
  owner:any
  player: any; 
  tournaments:any[]=[]
  tournaments$ = new BehaviorSubject<Tournament[]>([]);
  constructor(
    private router: Router,
    private tournamentService: TournamentService,
    private profileService: ProfileService,
    
  ) {}

  ngOnInit(): void {
    this.owner=this.profileService.getProfile();

    this.tournamentService.getListRegistrationTournaments(this.owner.idPlayer).subscribe(data=>{
        this.tournaments=data
        this.tournaments$.next(this.tournaments)
    });
    console.log(this.tournaments);
  }

  goToTeam() {
    this.router.navigate(['/teams']);
  }

  goToTournament() {
    this.router.navigate(['/tournament']);
  }
  
  goToGame() {
    this.router.navigate(['/view-games']);
  }

  goToAllTournament(){
    this.router.navigate(['/all-tournament']);
  }
}
