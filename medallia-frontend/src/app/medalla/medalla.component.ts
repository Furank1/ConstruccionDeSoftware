import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Router, RouterLink } from '@angular/router';  // Importar Router

@Component({
  selector: 'app-medalla',
  standalone: true,
  templateUrl: './medalla.component.html',
  styleUrls: ['./medalla.component.css'],
  imports: [CommonModule, RouterLink]
})
export class MedallaComponent {

  constructor(private router: Router) {}  
/**  Estos usuarios con medallas son 
simplemente representativos, acá debe llamarse al backend para traer los datos reales**/
  usuarios = [
    {
      nombre: 'Usuario 1',
      medallas: ['Medalla de Oro', 'Medalla de Plata', 'Medalla de Bronce']
    },
    {
      nombre: 'Usuario 2',
      medallas: ['Medalla de Participación', 'Medalla de Excelencia']
    }
  ];

  irAProfile(): void {
    this.router.navigate(['/profile']);  
  }

  irAFeed(): void {
    this.router.navigate(['/feed']);  
    console.log('Navegar a feed');
  }
  irAMedallas(): void {
    this.router.navigate(['/medalla']);  
  }
  irACerrarSesion(): void {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);  
  }

  irAPublicar(): void {
    this.router.navigate(['/publicar']); 
  }
}
