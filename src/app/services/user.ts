import { Injectable } from '@angular/core';
import { USERS } from '../fake-data/users.data';
import { User } from '../models/user';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = USERS;

  register(user: User): any { 
    const exists = this.users.some( u => u.email.toLowerCase() === user.email.toLowerCase() ); 
    if (exists) { 
      alert('el email ya se encuentra registrado')
      return false; 
    } 
    user.idUser = this.users.length + 1; 
    
    this.users.push(user); 
    localStorage.setItem( 'users', JSON.stringify(this.users) ); 
    return user.idUser; 
  }

  
  getUsers() {
    return this.users;
  }
  getUserByUsername(name: string) {
    return this.users.find(u => u.name === name);
  }

  getUserById(id: number) {
    return this.users.find(u => u.idUser === id);
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    if (!user) {
      return null;
    }
    return JSON.parse(user);
  }

  getUserByEmail(email: String) {
    return this.users.find(u => u.email === email);
  }
  
  emailExists(email: string): boolean { 
    return this.users.some( user => user.email.toLowerCase() === email.toLowerCase() ); 
  }

}