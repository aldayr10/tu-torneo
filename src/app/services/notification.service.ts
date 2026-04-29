import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Notification } from '../models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notifications: Notification[] =
    JSON.parse(localStorage.getItem('notifications') || '[]');

  private notifications$ = new BehaviorSubject<Notification[]>(
    this.notifications
  );

  getNotifications() {
    return this.notifications$.asObservable();
  }

  getUserNotifications(idUser: number) {
    return this.notifications$.asObservable().pipe(
      map(notifications =>
        notifications.filter(n => n.userId === idUser)
      )
    );
  }

  getUnreadCount(idUser: number): number {
    return this.notifications.filter(
      n => !n.read && n.userId === idUser
    ).length;
  }

  createNotification(notification: Notification) {
    this.notifications.push({
      ...notification,
      idNotification: Date.now(),
      read: false,
      createdAt: new Date()
    });

    this.update();
  }

  markAsRead(id: number) {
    const notification = this.notifications.find(
      n => n.idNotification === id
    );

    if (notification) {
      notification.read = true;
      this.update();
    }
  }

  removeNotification(id: number) {
    this.notifications = this.notifications.filter(
      n => n.idNotification !== id
    );

    this.update();
  }

  private update() {
    localStorage.setItem(
      'notifications',
      JSON.stringify(this.notifications)
    );

    this.notifications$.next([...this.notifications]);
  }
}