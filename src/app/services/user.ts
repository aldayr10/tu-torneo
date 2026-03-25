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
    console.log(index);
    
    if(index !== -1){
      this.users[index] = updatedUser;
      console.log(this.users);
      
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

  getUserByEmail(email:String){
    return this.users.find(u => u.email === email); 
  }

}