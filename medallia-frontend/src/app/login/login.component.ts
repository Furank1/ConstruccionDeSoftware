import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule]
})
export class LoginComponent {
  constructor(private router: Router) {}

  onSubmit() {
    console.log("Formulario enviado");
    // Aquí puedes agregar lógica adicional si es necesario
  }
  goToRegister() {
    this.router.navigate(['/registro']); // Redirige a la ruta de creación de cuenta
  }
}
