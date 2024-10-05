import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Importar aquí
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true, // Asegúrate de que esto esté habilitado
  imports: [CommonModule, FormsModule]// Importa FormsModule aquí
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

  // Cambia esta línea para enviar el objeto loginData
  this.http.post<any>('http://localhost:8080/api/auth/login', loginData, { headers })
      .subscribe(
          response => {
              console.log('Login exitoso');
              this.router.navigate(['/dashboard']);
          },
          error => {
              console.error('Error de login', error);
              this.errorMessage = 'Credenciales incorrectas';
          }
      );
    }
}