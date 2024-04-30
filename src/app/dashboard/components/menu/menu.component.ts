import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
})
export class MenuComponent {

  loggedUser: any;
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.loggedUser = this.authService.currentUser;
  }

  onLogoff() {
    this.authService.logout();
    this.router.navigateByUrl('/auth')
  }

}
