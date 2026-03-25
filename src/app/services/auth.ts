import { Injectable } from '@angular/core';
import { USERS } from '../fake-data/users.data';
import { User } from '../models/user';
import { CanActivate } from "@angular/router";

@Injectable({
  providedIn:'root'
})
export class AuthService {

  login(email:string,password:string){

    const user = USERS.find(
      u => u.email === email && u.password === password
    );

    if(user){
      localStorage.setItem('user',JSON.stringify(user));
      return true;
    }

    return false;

  }

  logout(){
    localStorage.removeItem('user');
  }

  getCurrentUser():User | null{

    const user = localStorage.getItem('user');

    return user ? JSON.parse(user) : null;

  }

}