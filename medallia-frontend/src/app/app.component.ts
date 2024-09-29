import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router'; // Asegúrate de importar RouterModule

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule] // Asegúrate de importar RouterModule
})
export class AppComponent {
  constructor(private router: Router) {}

  goToRegister() {
    this.router.navigate(['/login']); // Redirige a la ruta de creación de cuenta
  }
}
