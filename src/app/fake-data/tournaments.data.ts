import { Tournament } from "../models/tournament";

export const TOURNAMENTS: Tournament[] = [

  {
    idTournament: 0,
    idOwner: 1,
    name: "Copa Barrio",
    categoryId: 1,
    description: 'hola',
    estado: 'ABIERTO',
    teams: []

  },
  {
    idTournament: 1,
    idOwner: 0,
    name: "Copa Barrio 2",
    categoryId: 0,
    description: 'hola',
    estado: 'ABIERTO',
    teams: [
      {
      idTeam: 2,
      name: "asd",
      categoryId: 2,
      ownerId: 2,
      primaryColor: "#f2f2f2",
      alternativeColor: "#000000",
      image: {},
      invitationCode:'',
      players: [],
      pendingInvitations :[]
    },

    {
      idTeam: 3,
      name: "asdf",
      categoryId: 0,
      ownerId: 2,
      primaryColor: "#f2f2f2",
      alternativeColor: "#000000",
      image: {},
      invitationCode:'',
      players: [],
      pendingInvitations :[]
    }
  ]

  },
  {
    idTournament: 2,
    idOwner: 0,
    name: "Copa Barrio 3",
    categoryId: 2,
    description: 'hola',
    estado: 'ABIERTO',
    teams: [
      {
      idTeam: 2,
      name: "asd",
      categoryId: 2,
      ownerId: 2,
      primaryColor: "#f2f2f2",
      alternativeColor: "#000000",
      image: {},
      invitationCode:'',
      players: [],
      pendingInvitations :[]
    },

    {
      idTeam: 3,
      name: "asdf",
      categoryId: 0,
      ownerId: 2,
      primaryColor: "#f2f2f2",
      alternativeColor: "#000000",
      image: {},
      invitationCode:'',
      players: [],
      pendingInvitations :[]
    }
  ]

  }


];