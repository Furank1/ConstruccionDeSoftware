import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-medalla',
  standalone: true,
  templateUrl: './medalla.component.html',
  styleUrls: ['./medalla.component.css'],
  imports: [CommonModule, RouterLink, HttpClientModule, NavbarComponent]
})
export class MedallaComponent {
  usuarios: any[] = [];
  medallas: any[] = [];
  medallaMap: Map<string, string> = new Map();
  mostrarMedallas: boolean = false ;

  constructor(private router: Router, private http: HttpClient) {
    this.cargarDatos();
  }


  toggleMostrarMedallas(usuario: any): void {
    usuario.mostrarMedallas = !usuario.mostrarMedallas;
  }
  // Método para cargar tanto las medallas como los usuarios
  cargarDatos(): void {
    // Utilizamos forkJoin para esperar a que ambas peticiones se completen
    forkJoin({
      medallas: this.http.get<any[]>('http://localhost:8080/medallas/obtenermedallas'),
      usuarios: this.http.get<any[]>('http://localhost:8080/medallas/obtenermedallasusuarios')
    }).subscribe(({ medallas, usuarios }) => {
      // Crear un mapeo de ObjectId -> nombre de medalla
      medallas.forEach(medalla => {
        this.medallaMap.set(medalla.id, medalla.nombre);
      });

      // Mapear los ObjectId de medallas a sus nombres usando el diccionario
      this.usuarios = usuarios.map(usuario => {
        return {
          nombre: usuario.email, // Aquí se usa el email como nombre del usuario (ajusta si tienes otro campo)
          medallas: usuario.medallas.map((medallaId: string) => this.medallaMap.get(medallaId) || 'Medalla desconocida') // Reemplazar ObjectId con nombre
        };
      });
      this.usuarios.sort((a, b) => b.medallas.length - a.medallas.length);
      console.log('Usuarios con medallas:', this.usuarios); // Verificar si los nombres de usuarios están presentes
    }, error => {
      console.error('Error al cargar los datos:', error);
    });
  }

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
