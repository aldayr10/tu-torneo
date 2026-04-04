import { Team } from "./team";

export interface Tournament{

  idTournament:number;
  idOwner:number;
  name:string;
  category:string;
  teams:Team[];

}