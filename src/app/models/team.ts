import { Player } from "./player";


export interface Team {

  idTeam: number;
  name: string;
  categoryId: number;
  ownerId: number;
  primaryColor: string;
  alternativeColor: string;
  image: {};
  invitationCode:String;
  players: Player[];
  pendingInvitations :Player[];
}