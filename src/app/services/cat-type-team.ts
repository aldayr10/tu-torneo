import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CatTypeTeam {
  public catalogo:any=[
    {
      id:0,
      name:"Fútbol 11"
    },
    {
      id:1,
      name:"Sala"
    },
    {
      id:2,
      name:"Fútbol 7"
    },
    {
      id:3,
      name:"Microfútbol"
    }
  ]


  getCatTypeTournamentTeam():[]{
    return this.catalogo;
  }

  
  
}
