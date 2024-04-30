import { Component } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { LoginModel } from '../../interfaces/login.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
})
export class LoginPageComponent {
  loginObj: LoginModel = new LoginModel();

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  areLoginFieldsValid(): boolean {
    return !!this.loginObj.email && !!this.loginObj.password;
  }

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

    const user = this.authService.login(this.loginObj.email, this.loginObj.password);

    if (!user) {
      Swal.fire({
        title: 'Este usuario no está registrado!',
        icon: 'warning',
        showConfirmButton: false,
        timer: 1500
      });

      return false;
    }

    this.router.navigateByUrl('/home');
    return true;
  }
}
