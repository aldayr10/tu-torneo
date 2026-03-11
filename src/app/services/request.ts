import { Injectable } from '@angular/core';
import { Request } from '../models/request';
import { REQUESTS_FAKE } from '../fake-data/requests.data';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private requests: Request[] = [...REQUESTS_FAKE];

  
  getAllRequests() {
    return this.requests;
  }

  sendRequest(request: Request) {

    request.id = this.requests.length + 1;
    request.status = 'Pendiente';
    this.requests.push(request);

  }

  getRequestsByTeam(teamId: number) {

    return this.requests.filter(r => r.teamId === teamId);

  }

  updateRequestStatus(requestId: number, status: 'Aceptada' | 'Rechazada') {

    const request = this.requests.find(r => r.id === requestId);

    if (request) {
      request.status = status;
    }

  }

  getRequestsByPlayer(playerId: number) {
    return this.requests.filter(r => r.playerId === playerId);
  }

}