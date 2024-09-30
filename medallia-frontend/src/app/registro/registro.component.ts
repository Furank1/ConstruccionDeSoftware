import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro',
  standalone: true,
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  imports: [FormsModule]
})
export class RegistroComponent {
  constructor(private router: Router) {}

  onRegister() {
    console.log("Formulario enviado");
    // Aquí puedes agregar lógica adicional si es necesario
  }
  goToHome() {
    // Aquí puedes implementar la navegación a la página principal.
    this.router.navigate(['/']); // Asegúrate de tener el RouterModule configurado para la navegación.
  }

}
