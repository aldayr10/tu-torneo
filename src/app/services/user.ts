import { Injectable } from '@angular/core';
import { USERS } from '../fake-data/users.data';
import { User } from '../models/user';

@Injectable({
  providedIn:'root'
})
export class UserService{

  users: User[] = USERS;

  register(user: User){
    user.idUser = this.users.length+1
    this.users.push(user);
    return user.idUser;
  }
  getUsers(){
    return this.users;
  }
  getUserByUsername(name: string){
    return this.users.find(u => u.name === name);
  }

  getUserById(id: number){
    return this.users.find(u => u.idUser === id);
  }

  getCurrentUser(){
    const user = localStorage.getItem('user');
    if(!user){
      return null;
    }
    return JSON.parse(user);
  }

  getUserByEmail(email:String){
    return this.users.find(u => u.email === email); 
  }

}