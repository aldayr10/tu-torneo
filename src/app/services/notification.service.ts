import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { Notification } from '../models/notification';
import { API_BASE_URL } from '../core/api-config';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);
  private readonly notificationsSubject = new BehaviorSubject<Notification[]>([]);
  readonly notifications$ = this.notificationsSubject.asObservable();

  getNotifications(): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.baseUrl}/notification`).pipe(
      tap(notifications => this.notificationsSubject.next(notifications)),
    );
  }

  getUserNotifications(_idUser: number): Observable<Notification[]> {
    // Backend scopes to authenticated user.
    return this.getNotifications();
  }

  getUnreadCount(_idUser: number): number {
    return this.notificationsSubject.value.filter(n => !n.read).length;
  }

  markAsRead(id: number): Observable<Notification> {
    return this.http.patch<Notification>(`${this.baseUrl}/notification/${id}`, { read: true }).pipe(
      tap(updated => this.notificationsSubject.next(
        this.notificationsSubject.value.map(n => n.idNotification === id ? updated : n),
      )),
    );
  }

  markAllAsRead(_idUser: number): Observable<unknown> {
    return this.http.patch(`${this.baseUrl}/notification/read-all`, {}).pipe(
      tap(() => this.notificationsSubject.next(
        this.notificationsSubject.value.map(n => ({ ...n, read: true })),
      )),
    );
  }

  removeNotification(id: number): Observable<unknown> {
    return this.http.delete(`${this.baseUrl}/notification/${id}`).pipe(
      tap(() => this.notificationsSubject.next(
        this.notificationsSubject.value.filter(n => n.idNotification !== id),
      )),
    );
  }

  // Legacy local helper no longer supported; backend creates notifications in domain flows.
  createNotification(_notification: Notification): void {
    // no-op: notifications are created by backend flows.
  }
}
