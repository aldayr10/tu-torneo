import { Injectable } from '@angular/core';
import { USERS } from '../fake-data/users.data';
import { User } from '../models/user';

@Injectable({
  providedIn:'root'
})
export class UserService{

  users: User[] = USERS;

  register(user: User){

    user.id = Date.now();

    this.users.push(user);

  }

  updateProfile(updatedUser: User){

    const index = this.users.findIndex(u => u.id === updatedUser.id);

    if(index !== -1){
      this.users[index] = updatedUser;
    }

  }

  getUsers(){
    return this.users;
  }

  // 🔹 Buscar usuario por username
  getUserByUsername(name: string){

    return this.users.find(u => u.name === name);

  }

  // 🔹 Buscar usuario por id
  getUserById(id: number){

    return this.users.find(u => u.id === id);

  }


  getCurrentUser(){

    const user = localStorage.getItem('user');

    if(!user){
      return null;
    }

    return JSON.parse(user);

  }

}