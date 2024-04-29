import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  imagenUrl: string = 'assets/imagen-login.jpg';

  //Esta variable se usa para que por defecto nos quede en la de iniciar sesion, se complementa con el html
  isSignDivVisiable:  boolean = false;
  isLoginFormVisible: boolean = true;
  signUpObj: SignUpModel = new SignUpModel();
  loginObj: LoginModel = new LoginModel();

  constructor(private router: Router, private http: HttpClient) {}
  
  // Validar si los campos del formulario de registro están completos
  areSignUpFieldsValid(): boolean {
    return !!this.signUpObj.name && !!this.signUpObj.lastname && !!this.signUpObj.email && !!this.signUpObj.password && !!this.signUpObj.confirmPassword;
  }
  // Validar si los campos del formulario de inicio de sesión están completos
  areLoginFieldsValid(): boolean {
    return !!this.loginObj.email && !!this.loginObj.password;
  }

  toggleForms() {
    this.isLoginFormVisible = !this.isLoginFormVisible;
  }

  isPasswordValid(password: string): boolean {
    // Aquí validamos la contraseña
    const passwordRegex = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?!.([a-z0-9])\1)(?=.[#$@!%&?¡"+,.:;='^|~_()¿{}[]\-])[A-Za-z\d#$@!%&?¡"+,.:;='^|~_()¿{}[]\-]{8,32}$/;
    return passwordRegex.test(password);
  }

  // Función para hacer el registro
  onRegister() {
    if (!this.areSignUpFieldsValid()) {
      Swal.fire({
        title: 'Por favor, complete todos los campos.',
        icon: 'warning',
        showConfirmButton: false,
        timer: 1500
      });
      return false; // Añadimos un valor de retorno aquí
    }

    // Validar que las contraseñas coincidan
    if (this.signUpObj.password !== this.signUpObj.confirmPassword) {
      Swal.fire({
        title: 'Las contraseñas no coinciden.',
        icon: 'error',
        showConfirmButton: true
      });
      return false;
    }

    /* const localUser = localStorage.getItem('usuarios');
    const users = localUser ? JSON.parse(localUser) : [];
    users.push(this.signUpObj);
    localStorage.setItem('usuarios', JSON.stringify(users)); */

    const localUser = localStorage.getItem('usuarios');
    this.http.post<any>('http://localhost:3000/usuarios', this.signUpObj).subscribe(
      (response) => {
        // Registro exitoso
        Swal.fire({
          title: 'Registro exitoso!',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigateByUrl('/home');
        });

      }
    )
    /* if(localUser != null) {
      const users =  JSON.parse(localUser);
      users.push(this.signUpObj);
      localStorage.setItem('usuarios', JSON.stringify(users))
    } else {
      const users = [];
      users.push(this.signUpObj);
      localStorage.setItem('usuarios', JSON.stringify(users))
    } */

    

    return true; // Añadimos un valor de retorno aquí
  }

  // Función para hacer el inicio de sesión
  onLogin() {

    if (!this.areLoginFieldsValid()) {
      Swal.fire({
        title: 'Por favor, complete todos los campos.',
        icon: 'warning',
        showConfirmButton: false,
        timer: 1500
      });
      return false;
    }

    this.http.get<any[]>('http://localhost:3000/usuarios').subscribe(
      (localUsers) => {
        const isUserPresent = localUsers.find((user: SignUpModel) => user.email === this.loginObj.email && user.password === this.loginObj.password);
        if (isUserPresent) {
          // Inicio de sesión exitoso
          localStorage.setItem('loggedUser', JSON.stringify(isUserPresent));
          this.router.navigateByUrl('/home');
        } else {
          // Usuario no encontrado

          Swal.fire({
            title: 'Este usuario no está registrado!',
            icon: 'warning',
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    );

    /* if (localUsers) {
      const users = JSON.parse(localUsers);
      const isUserPresent = users.find((user: SignUpModel) => user.email === this.loginObj.email && user.password === this.loginObj.password);
      if (isUserPresent) {
        localStorage.setItem('loggedUser', JSON.stringify(isUserPresent));
        this.router.navigateByUrl('/home');
        return true;
      } else {
        Swal.fire({
          title: 'Este usuario no está registrado!',
          icon: 'warning',
          showConfirmButton: false,
          timer: 1500
        });
        return false;
      }
    } */

    return true;
  }
}

export class SignUpModel {
  email:    string;
  name:     string;
  lastname: string;
  password: string;
  confirmPassword: string;

  constructor() {
    this.email = '';
    this.name = '';
    this.lastname = '';
    this.password = '';
    this.confirmPassword = '';
  }
}

export class LoginModel {
  email: string;
  password: string;

  constructor() {
    this.email = '';
    this.password = '';
  }
}
