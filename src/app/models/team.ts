import { User } from "./user";

export interface Team {

  idTeam: number;
  name: string;
  categoryId: number;
  ownerId: number;
  primaryColor: string;
  alternativeColor: string;
  image: {};
  players: User[];

}