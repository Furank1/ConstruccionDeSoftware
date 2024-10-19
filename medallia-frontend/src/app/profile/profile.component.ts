import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import { PublicacionComponent } from '../publicacion/publicacion.component';
import { Router } from '@angular/router';
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [
    HttpClientModule,
    NgForOf,
    PublicacionComponent,
    NgIf
  ],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user!: {
    medallas: any[];
    descripcion: string;
    publicaciones: any[];
    usuarioId: string;
    nombre: string;
  };

  cargarDatosUsuario(): void {
    this.http.get<any>('http://localhost:8080/api/auth/login')
      .subscribe(
        (data: any) => {
          console.log('Datos del usuario cargados', data);
          this.user = data;

          this.cargarPublicacionesUsuario(this.user?.usuarioId);
        },
        (error: any) => {
          console.error('Error al cargar los datos del usuario', error);
        }
      );
  }

  ngOnInit(): void {
    this.cargarDatosUsuario();
  }

  cargarPublicacionesUsuario(usuarioId: string | undefined): void {
    if (!usuarioId) return;

    this.http.get<any[]>('http://localhost:8080/publicaciones/get')
      .subscribe(
        (data: any[]) => {
          console.log('Publicaciones cargadas', data);


          const publicacionesDelUsuario = data.filter(post => post.usuarioId === usuarioId)
            .map(post => ({
              ...post,
              aplaudido: false,  // Inicialización de aplaudido como falso
              nombre: this.extraerNombreUsuario(post.usuarioId)
            }));

          this.user = {
            ...this.user,
            publicaciones: publicacionesDelUsuario
          };
        },
        (error: any) => {
          console.error('Error al cargar publicaciones', error);
        }
      );
  }


  extraerNombreUsuario(nombreUsuario: string): string {
    return nombreUsuario.split('@')[0];
  }

  constructor(private router: Router, private http: HttpClient) { }

  irAFeed(): void {
    this.router.navigate(['/feed']);
  }

  irACerrarSesion(): void {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }

  irAPublicar(): void {
    this.router.navigate(['/publicar']);
  }
}
