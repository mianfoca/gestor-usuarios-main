import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, tap, of } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { User } from '../interfaces/user.interface';
import { SignUpModel } from '../interfaces/signup.interface';

@Injectable({providedIn: 'root'})
export class AuthService {

  private users: User[] = [];

  constructor(private http: HttpClient) { 
    const localUsers = localStorage.getItem('usuarios');
    if(localUsers != null) {
      this.users = JSON.parse(localUsers);
    }
  }

  get currentUser():User|undefined {
    const userJSON = localStorage.getItem('currentUser');    

    if ( !userJSON ) return undefined;

    const user:User = JSON.parse(userJSON);

    return structuredClone( user );
  }

  register( {name, lastname, email, password}: SignUpModel   ) {
    const user: User = { id: uuid(), name, lastname, email, password };
    this.users.push(user);
    localStorage.setItem('usuarios', JSON.stringify(this.users) );
  }

  login(email: string, password: string) : User | undefined {
    const user = this.users.find(user => user.email === email && user.password === password);
    localStorage.setItem('currentUser', JSON.stringify(user));

    return user;
  }

  checkAuthentication(): Observable<boolean> {   
    if ( !this.currentUser ) return of(false);

    return of(true);
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}