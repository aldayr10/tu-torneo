export interface Notification { 
  idNotification: number; 
  userId: number; 
  type: string; 
  title: string; 
  message: string; 
  teamId?: number; 
  playerId?: number; 
  read: boolean; 
  createdAt: Date; 
}