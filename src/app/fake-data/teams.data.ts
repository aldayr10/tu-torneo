import { Team } from "../models/team";

export const TEAMS: Team[] = [

  {
    idTeam: 0,
    name: "a",
    categoryId: 0,
    ownerId: 0,
    primaryColor: "#f2f2f2",
    alternativeColor: "#000000",
    image: {},
    invitationCode:'',
    players: [],
    pendingInvitations :[]
  },

  {
    idTeam: 1,
    name: "as",
    categoryId: 0,
    ownerId: 0,
    primaryColor: "#f2f2f2",
    alternativeColor: "#000000",
    image: {},
    invitationCode:'',
    players: [],
    pendingInvitations :[]
  },

  {
    idTeam: 2,
    name: "asd",
    categoryId: 0,
    ownerId: 0,
    primaryColor: "#f2f2f2",
    alternativeColor: "#000000",
    image: {},
    invitationCode:'',
    players: [
      {
        idPlayer: 0,
        idUser: 0,
        name: 'Admin',
        dateBirth: new Date('2000-01-01')
      },

    ],
    pendingInvitations :[]
  },

  {
    idTeam: 3,
    name: "asdf",
    categoryId: 0,
    ownerId: 0,
    primaryColor: "#f2f2f2",
    alternativeColor: "#000000",
    image: {},
    invitationCode:'',
    players: [
      {
        idPlayer: 0,
        idUser: 0,
        name: 'Admin',
        dateBirth: new Date('2000-01-01')
      },
    ],
    pendingInvitations :[]
  },

];