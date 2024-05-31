import { Component } from '@angular/core';
import { UserForm } from '../models/user-form';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form = new UserForm();

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {
    if (this.storageService.isLogIn()) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe({
      next: (data) => {
        this.storageService.saveToken(data);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
