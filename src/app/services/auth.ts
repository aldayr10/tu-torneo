import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn:'root'
})
export class AuthService{

  private apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient){}

  login(email:string,password:string):Observable<any>{

    return this.http.post(`${this.apiUrl}/login`,{
      email,
      password
    });

  }

  logout(){

    localStorage.removeItem('user');
    localStorage.removeItem('token');

  }

  saveSession(user:any,token:string){

    localStorage.setItem('user',JSON.stringify(user));
    localStorage.setItem('token',token);

  }

  getCurrentUser():User | null{

    const user = localStorage.getItem('user');

    return user ? JSON.parse(user) : null;

  }

  getToken(){

    return localStorage.getItem('token');

  }

}
