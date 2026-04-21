import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: number;
  message: string;
  userId: number;
  date: Date;
  read: boolean;
}

@Injectable({ providedIn: 'root' })
export class NotificationService {

  private notifications: Notification[] = [];
  private notifications$ = new BehaviorSubject<Notification[]>([]);

  getNotifications() {
    return this.notifications$.asObservable();
  }

  sendNotification(notification: Notification) {
    this.notifications.push(notification);
    this.notifications$.next(this.notifications);
  }
}
