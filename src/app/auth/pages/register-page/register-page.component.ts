import { Component } from '@angular/core';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import { SignUpModel } from '../../interfaces/signup.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
})
export class RegisterPageComponent {
  signUpObj: SignUpModel = new SignUpModel();

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }
  
  areSignUpFieldsValid(): boolean {
    return !!this.signUpObj.name && !!this.signUpObj.lastname && !!this.signUpObj.email && !!this.signUpObj.password && !!this.signUpObj.confirmPassword;
  }

  isPasswordValid(password: string): boolean {
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

    this.authService.register(this.signUpObj);

    Swal.fire({
      title: 'Registro exitoso!',
      icon: 'success',
      showConfirmButton: false,
      timer: 1500
    }).then(() => {
      this.router.navigateByUrl('/auth/login');
    });

    return true; // Añadimos un valor de retorno aquí
  }
}
