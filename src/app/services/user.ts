import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, map } from 'rxjs';
import { API_BASE_URL } from '../core/api-config';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  register(user: Pick<User, 'name' | 'email' | 'password'>): Observable<User> {
    return this.http.post<User>(`${this.baseUrl}/users`, user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  getUserByUsername(name: string): Observable<User | undefined> {
    return this.getUsers().pipe(map(users => users.find(user => user.name === name)));
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

  getCurrentUser() {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) as User : null;
    } catch {
      return null;
    }
  }

  getUserByEmail(email: string): Observable<User | undefined> {
    return this.getUsers().pipe(map(users => users.find(user => user.email === email)));
  }
  
  emailExists(email: string): Observable<boolean> {
    return this.getUsers().pipe(map(users =>
      users.some(user => user.email.toLowerCase() === email.toLowerCase()),
    ));
  }
}