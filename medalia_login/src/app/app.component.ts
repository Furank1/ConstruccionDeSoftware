import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';  // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [LoginComponent]  // Asegúrate de incluir LoginComponent aquí
})
export class AppComponent {}