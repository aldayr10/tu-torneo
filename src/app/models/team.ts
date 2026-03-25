import { User } from "./user";

export interface Team {

  id: number;
  name: string;
  category: number;
  ownerId: number;
  primaryColor: string;
  alternativeColor: string;
  image: {};
  players: User[];

}