export interface Request {

  id: number;

  teamId: number;

  playerId: number;

  playerName: string;

  status: 'pending' | 'accepted' | 'rejected';

}