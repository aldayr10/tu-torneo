import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn:'root'
})

export class TournamentService{

  private apiUrl = 'http://localhost:8080/api/tournaments';

  constructor(private http: HttpClient){}

  getTournaments(): Observable<any[]>{

    return this.http.get<any[]>(this.apiUrl);

  }

  addTeamToTournament(tournamentId:number,team:any): Observable<any>{

    return this.http.post(
      `${this.apiUrl}/${tournamentId}/teams`,
      team
    );

  }

}