import { Team } from "./team";

export interface Tournament{

  id:number;
  idOwner:number;
  name:string;
  category:string;
  teams:Team[];

}