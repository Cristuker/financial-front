import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoNotificationService } from '@po-ui/ng-components';
import { PoStorageService } from '@po-ui/ng-storage';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  hideRememberUser: boolean = true;

  constructor(
    private readonly loginService: LoginService,
    private storage: PoStorageService,
    private router: Router,
    private poNotification: PoNotificationService
  ) {}

  loginSubmit(formData: any) {
    const user = Object.assign({
      username: formData.login,
      password: formData.password,
    });

    this.loginService.login(formData.login, formData.password).subscribe(
      () => {
        this.storage.set('isLoggedIn', 'true').then(() => {
          this.router.navigate(['/home']);
        });
      },
      () => {
        this.poNotification.error(
          'Invalid username or password. Please try again.'
        );
      }
    );
  }
}
