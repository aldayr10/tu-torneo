import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Notification } from '../models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notifications: Notification[] = JSON.parse(localStorage.getItem('notifications') || '[]');
  private notifications$ = new BehaviorSubject<Notification[]>(this.notifications);

  getNotifications(idUser: number) {
    return this.notifications$.asObservable();
  }

  getUserNotifications(idUser: number) {
    return this.notifications$.asObservable();
  }

  getUnreadCount(idUser: number): number {
    return this.notifications.filter(n => !n.read && n.idUser === idUser).length;
  }

  createNotification(idUser: number, message: string) {

    this.notifications.push({
      idNotification: Date.now(),
      idUser,
      message,
      read: false,
      date: new Date()
    });

    this.update();
  }

  markAsRead(id: number) {
    const n = this.notifications.find(x => x.idNotification === id);
    if (n) n.read = true;
    this.update();
  }

  private update() {
    localStorage.setItem('notifications', JSON.stringify(this.notifications));
    this.notifications$.next([...this.notifications]);
  }

}