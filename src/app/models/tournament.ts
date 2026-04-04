import { Team } from "./team";

export interface Tournament{

  idTournament:number;
  idOwner:number;
  name:string;
  category:number;
  description: string;
  teams:Team[];

}