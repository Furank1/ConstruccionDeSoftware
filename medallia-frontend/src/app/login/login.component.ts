import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule]
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

ngOnInit():void{
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser) {
    this.router.navigate(['/feed']);
  }
}

  onSubmit() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post<any>('http://localhost:8080/cuenta/login', loginData, { headers })
      .subscribe(
        response => {
          console.log('Login exitoso');
          const userId = response.id;
          localStorage.setItem('userId', userId);
                    localStorage.setItem('loggedInUser', response.id);
          localStorage.setItem('userEmail', response.email);
          this.router.navigate(['/feed']);

        },
        error => {
          console.error('Error de login', error);
          alert('Fallo el login');
          this.errorMessage = 'Credenciales incorrectas';
        }
      );
  }

  goToRegister() {
    this.router.navigate(['/registro']); // opcional implementar el registro
  }
}
