import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Request {
  id: number;
  fromUser: number;
  toTeam: number;
  type: 'JOIN' | 'INVITE';
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

@Injectable({ providedIn: 'root' })
export class RequestService {

  private requests: Request[] = [];
  private requests$ = new BehaviorSubject<Request[]>([]);

  getRequests() {
    return this.requests$.asObservable();
  }

  sendRequest(request: Request) {
    this.requests.push(request);
    this.requests$.next(this.requests);
  }

  respondRequest(id: number, status: 'ACCEPTED' | 'REJECTED') {
    const req = this.requests.find(r => r.id === id);
    if (req) {
      req.status = status;
      this.requests$.next(this.requests);
    }
  }
}
