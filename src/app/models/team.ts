import { User } from "./user";

export interface Team {

  id: number;
  name: string;
  category: string;
  ownerId: number;
  players: User[];

}