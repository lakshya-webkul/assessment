import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private apiService: ApiService, private router: Router) { }

  async login() {
    try {
      await this.apiService.login(this.email, this.password);
      const userData = {
        token: crypto.randomUUID(),
        email: this.email
      };
      localStorage.setItem('user', JSON.stringify(userData));
      this.router.navigate(['/gadgets']);
    } catch (error: any) {
      this.errorMessage = error.response?.data?.error || 'Login failed!';
    }
  }
}
