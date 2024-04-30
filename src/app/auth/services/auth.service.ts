import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, tap, of } from 'rxjs';
import { v4 as uuid } from 'uuid';

import { environment } from '../../../environments/environment';
import { User } from '../interfaces/user.interface';
import { SignUpModel } from '../interfaces/signup.interface';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = environment.baseUrl;
  private users: User[] = [];
  private user?: User;

  constructor(private http: HttpClient) { 
    const localUsers = localStorage.getItem('usuarios');
    if(localUsers != null) {
      this.user = JSON.parse(localUsers);
    }
  }

  get currentUser():User|undefined {
    if ( !this.user ) return undefined;
    return structuredClone( this.user );
  }

  register( {name, lastname, email, password}: SignUpModel   ) {
    const user: User = { id: uuid(), name, lastname, email, password };
    this.users.push(user);
  }

  login(email: string, password: string) : User | undefined {
    const user = this.users.find(user => user.email === email && user.password === password);
  
    if (user) {
      of(user).pipe(
        tap(user => this.user = user),
      );
    }

    return user;
  }

  checkAuthentication(): Observable<boolean> {
    return of(!!this.currentUser);
  }


  logout() {
    this.user = undefined;
  }



}