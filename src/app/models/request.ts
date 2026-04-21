export interface Request {
  idRequest: number;
  idTeam: number;
  idPlayer: number;
  type: 'Unirse' | 'Invitar';
  status: 'Pendiente' | 'Aceptada' | 'Rechazada';
  createdAt: Date| '';
}