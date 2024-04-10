import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  onLogin(): void {

    this.authService.login('jorge@gmail.com','123456')
      .subscribe( user => {
        this.router.navigate(['/']);

      });

  }
}
