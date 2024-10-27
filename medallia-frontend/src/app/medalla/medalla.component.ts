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
    forkJoin({
      medallas: this.http.get<any[]>('http://localhost:8080/medallas/obtenermedallas'),
      usuarios: this.http.get<any[]>('http://localhost:8080/medallas/obtenermedallasusuarios')
    }).subscribe(({ medallas, usuarios }) => {
      medallas.forEach(medalla => {
        this.medallaMap.set(medalla.id, medalla.nombre);
      });

      this.usuarios = usuarios.map(usuario => {
        return {
          nombre: usuario.email,
          medallas: usuario.medallas.map((medallaId: string) => this.medallaMap.get(medallaId) || 'Medalla desconocida')
        };
      });
      this.usuarios.sort((a, b) => b.medallas.length - a.medallas.length);
      console.log('Usuarios con medallas:', this.usuarios); // Verificar si los nombres de usuarios están presentes
    }, error => {
      console.error('Error al cargar los datos:', error);
    });
  }


  obtenerUsuarioConMasMedallas(): void {
    this.http.get<any[]>('http://localhost:8080/cuenta/cuentasmasmedallas').subscribe(data => {
      if (data.length > 0) {
        this.usuarioConMasMedallas = data[0];
      }
      console.log('Usuario con más medallas:', this.usuarioConMasMedallas);
    }, error => {
      console.error('Error al obtener el usuario con más medallas:', error);
    });
  }

  // Métodos de navegación
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
