import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  imports: [FormsModule, RouterModule, HttpClientModule, CommonModule]
})
export class RegistroComponent {
  registerData = {
    email: '',
    password: '',
    confirmPassword: ''
  };
  emailError = ''; // mensaje de error del correo
  passwordError = ''; // mensaje de error de contraseña
  registrationSuccess = false; // mensaje de éxito

  private apiUrl = 'http://localhost:8080/cuenta/register';

  constructor(private router: Router, private http: HttpClient) {}

  // validar el correo electrónico
  isValidEmail(email: string): boolean {
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailPattern.test(email);
  }

  // validar las contraseñas
  passwordsMatch(): boolean {
    return this.registerData.password === this.registerData.confirmPassword;
  }

  onRegister() {
    if (!this.isValidEmail(this.registerData.email)) {
      this.emailError = "Por favor ingresa un correo electrónico válido.";
      return;
    }
    this.emailError = ''; // 

    if (!this.passwordsMatch()) {
      this.passwordError = "Las contraseñas no coinciden.";
      return;
    }
    this.passwordError = ''; // Limpiar mensaje de error si las contraseñas coinciden

    const { email, password } = this.registerData;
    this.http.post(this.apiUrl, { email, password }).subscribe(
      (response: any) => {
        console.log("Formulario enviado");
        console.log('Cuenta creada con éxito:', response);
        this.registrationSuccess = true; // Mostrar mensaje de éxito

        // Redirigir después de 2 segundos
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      (error) => {
        console.error('Error al crear la cuenta:', error);
        alert('Hubo un error al crear la cuenta. Inténtalo de nuevo.');
      }
    );
  }

  // Actualiza el mensaje de error mientras se escribe en el correo
  onEmailInput() {
    if (!this.isValidEmail(this.registerData.email)) {
      this.emailError = "Por favor ingresa un correo electrónico válido.";
    } else {
      this.emailError = '';
    }
  }

  // Actualiza el mensaje de error mientras se escriben las contraseñas
  onPasswordInput() {
    if (!this.passwordsMatch()) {
      this.passwordError = "Las contraseñas no coinciden.";
    } else {
      this.passwordError = '';
    }
  }

  goToHome() {
    this.router.navigate(['/login']);
  }
}
