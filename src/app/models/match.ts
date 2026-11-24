import { Team } from './team';

export type MatchStatus = 'PENDIENTE' | 'FINALIZADO';

export interface Match {
  idMatch: number;
  idTournament: number;
  round: number;
  teamAId: number;
  teamBId: number;
  teamA?: Team & { players?: any[] };
  teamB?: Team & { players?: any[] };
  scheduledDate?: string | null;
  scheduledTime?: string | null;
  scoreA?: number | null;
  scoreB?: number | null;
  winnerTeamId?: number | null;
  status: MatchStatus;
}
