import { Team } from "./team";

export interface Tournament{

  idTournament:number;
  idOwner:number;
  name:string;
  category:number;
  description: string;
  estado: 'ABIERTO' | 'EN_CURSO' | 'FINALIZADO';
  teams:Team[];

}