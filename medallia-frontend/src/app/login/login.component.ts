import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [FormsModule],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router) {}

  onSubmit() {
    console.log("Formulario enviado");
    // Redirigir a la página de inicio de sesión
    this.router.navigate(['/login']); // Redirige a la ruta de inicio
  }
}
