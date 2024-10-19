import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';  // Importar Router
import { HttpClientModule, HttpClient } from '@angular/common/http'; // Importar HttpClient y HttpClientModule
import { forkJoin } from 'rxjs'; // Importar forkJoin para manejar múltiples peticiones

@Component({
  selector: 'app-medalla',
  standalone: true,
  templateUrl: './medalla.component.html',
  styleUrls: ['./medalla.component.css'],
  imports: [CommonModule, RouterLink, HttpClientModule] // Agregar HttpClientModule aquí
})
export class MedallaComponent {
  usuarios: any[] = [];
  medallas: any[] = [];
  medallaMap: Map<string, string> = new Map(); // Diccionario para mapear ObjectId a nombres

  constructor(private router: Router, private http: HttpClient) {
    this.cargarDatos();  // Cargar las medallas y luego los usuarios
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
