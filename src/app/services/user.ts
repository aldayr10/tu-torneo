import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';
import { User } from '../models/user';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn:'root'
})

export class UserService{

  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient){}

  register(user: User): Observable<User>{

    return this.http.post<User>(this.apiUrl, user);

  }

  updateProfile(user: User): Observable<User>{

    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);

  }

  getUsers(): Observable<User[]>{

    return this.http.get<User[]>(this.apiUrl);

  }

  getUserById(id: number): Observable<User>{

    return this.http.get<User>(`${this.apiUrl}/${id}`);

  }

  getUserByUsername(username: string): Observable<User | null> {
    return this.http.get<User>(`${this.apiUrl}/username/${username}`)
      .pipe(
        map(user => user || null), // por si el backend devuelve null o undefined
        catchError(() => of(null)) // si hay error devuelve null
      );
  }

  getCurrentUser() {

  const user = localStorage.getItem('user');

  if (!user) {
    return null;
  }

  return JSON.parse(user);

}

}