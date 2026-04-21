import { Component, OnInit } from '@angular/core';
import { Tournament } from '../../../../models/tournament';
import { TournamentService } from '../../../../services/tournament.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-info-tournament',
  templateUrl: './info-tournament.html',
  styleUrl: './info-tournament.css',
})
export class InfoTournament implements OnInit {

  tournament?: Tournament;

  constructor(
    private tournamentService: TournamentService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.tournamentService.getTournaments();

    this.tournamentService.getTournamentById(id)
      .subscribe(t => {
        this.tournament = t;
      });
  }

  canStart(): boolean {
    if (!this.tournament) return false;

    return (
      this.tournament.teams.length >= 2 &&
      this.tournament.estado === 'ABIERTO'
    );
  }

  startTournament() {
    
    this.tournamentService.startTournament
    this.tournament!.estado = 'EN_CURSO';
  }

}