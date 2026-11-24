import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Request } from '../models/request';
import { API_BASE_URL } from '../core/api-config';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);
  private readonly requestsSubject = new BehaviorSubject<Request[]>([]);
  readonly requests$ = this.requestsSubject.asObservable();

  getRequests(): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.baseUrl}/request`).pipe(
      tap(requests => this.requestsSubject.next(requests)),
    );
  }

  getRequestsByTeam(idTeam: number): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.baseUrl}/request`, { params: { teamId: idTeam } }).pipe(
      tap(requests => this.requestsSubject.next(requests)),
    );
  }

  getRequestsByPlayer(idPlayer: number): Observable<Request[]> {
    return this.http.get<Request[]>(`${this.baseUrl}/request`, { params: { playerId: idPlayer } }).pipe(
      tap(requests => this.requestsSubject.next(requests)),
    );
  }

  createRequest(request: Pick<Request, 'idTeam' | 'idPlayer' | 'type'>): Observable<Request> {
    return this.http.post<Request>(`${this.baseUrl}/request`, request).pipe(
      tap(created => this.requestsSubject.next([created, ...this.requestsSubject.value])),
    );
  }

  updateStatus(idRequest: number, status: 'Aceptada' | 'Rechazada'): Observable<Request> {
    return this.http.patch<Request>(`${this.baseUrl}/request/${idRequest}`, { status }).pipe(
      tap(updated => this.requestsSubject.next(
        this.requestsSubject.value.map(r => r.idRequest === idRequest ? updated : r),
      )),
    );
  }

  getPendingCount(): number {
    return this.requestsSubject.value.filter(r => r.status === 'Pendiente').length;
  }
}
