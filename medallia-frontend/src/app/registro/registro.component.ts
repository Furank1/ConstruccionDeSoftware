import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  imports: [FormsModule, RouterModule, HttpClientModule]
})
export class RegistroComponent {
  registerData = {
    username: '',
    email: '',
    password: ''
  };

  private apiUrl = 'http://localhost:8080/account/register'; // aquí joaco
  constructor(private router: Router, private http: HttpClient) {}

  onRegister() {

    this.http.post(this.apiUrl, this.registerData).subscribe(
      (response: any) => {
        console.log("Formulario enviado");
        console.log('Cuenta creada con éxito:', response);
        this.router.navigate(['/feed']); 
      },
      (error) => {
        console.error('Error al crear la cuenta:', error);
      }
    );
    this.router.navigate(['/login']);
  }
  goToHome() {
    this.router.navigate(['/login']);
  }

}
