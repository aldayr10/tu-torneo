import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from '../models/request';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private apiUrl = 'http://localhost:8080/api/requests';

  constructor(private http: HttpClient) {}

  getAllRequests(): Observable<Request[]> {

    return this.http.get<Request[]>(this.apiUrl);

  }

  sendRequest(request: Request): Observable<Request> {

    return this.http.post<Request>(this.apiUrl, request);

  }

  getRequestsByTeam(teamId: number): Observable<Request[]> {

    return this.http.get<Request[]>(`${this.apiUrl}/team/${teamId}`);

  }

  updateRequestStatus(
    requestId: number,
    status: 'Aceptada' | 'Rechazada'
  ): Observable<Request> {

    return this.http.put<Request>(
      `${this.apiUrl}/${requestId}`,
      { status }
    );

  }

  getRequestsByPlayer(playerId: number): Observable<Request[]> {

    return this.http.get<Request[]>(`${this.apiUrl}/player/${playerId}`);

  }

}