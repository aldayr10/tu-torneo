import { Team } from "./team";

export interface Tournament{

  id:number;
  name:string;
  category:string;
  teams:Team[];

}