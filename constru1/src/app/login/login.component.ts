import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  credentials = { username: '', password: '' };

  constructor(private router: Router, private http: HttpClient) {}

  onLogin() {
    this.http.post<any>('http://localhost:8081/account/login', this.credentials).subscribe(
      response => {
        console.log('Login successful:', response);
      },
      error => {
        console.error('Login failed:', error);
      }
    );
  }

  
}
