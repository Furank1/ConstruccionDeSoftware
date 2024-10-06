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
  imports: [CommonModule, FormsModule, HttpClientModule]  // Asegúrate de importar HttpClientModule aquí
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const loginData = {
      email: this.email,
      password: this.password
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.http.post<any>('http://localhost:8080/api/auth/login', loginData, { headers })
      .subscribe(
        response => {
          console.log('Login exitoso');
          this.router.navigate(['/feed']);
        },
        error => {
          console.error('Error de login', error);
          this.errorMessage = 'Credenciales incorrectas';
        }
      );
  }

  goToRegister() {
    this.router.navigate(['/registro']); // Redirige a la ruta de creación de cuenta
  }
}
