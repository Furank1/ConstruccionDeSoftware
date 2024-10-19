import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import { PublicacionComponent } from '../publicacion/publicacion.component';
import { Router } from '@angular/router';
import {HttpClient, HttpClientModule} from "@angular/common/http";  // Importar Router

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
  user: {
    medallas: any[];
    descripcion: string;
    publicaciones: any[];  // Asegúrate de definir el tipo
    usuarioId: string;
    nombre: string;
  }| undefined

  cargarDatosUsuario(): void {

    this.http.get<any>('http://localhost:8080/usuario/get')
      .subscribe(
        (data: any) => {
          console.log('Datos del usuario cargados', data);
          this.user = data;

          this.cargarPublicacionesUsuario(this.user);
        },
        (error: any) => {
          console.error('Error al cargar los datos del usuario', error);
        }
      );
  }

  ngOnInit(): void {
    this.cargarPublicacionesUsuario(this.user);
  }

  cargarPublicacionesUsuario(nombreUsuario: { publicaciones: any[] } | undefined): void {
    this.http.get<any[]>('http://localhost:8080/publicaciones/get')
      .subscribe(
        (data: any[]) => {
          console.log('Publicaciones cargadas', data);

          // Filtrar publicaciones que pertenecen al usuario actual
          const publicacionesDelUsuario = data
            .filter(post => post.nombreUsuario === nombreUsuario)
            .map(post => {
              return {
                ...post,
                aplaudido: false,
                nombre: this.extraerNombreUsuario(post.nombreUsuario)
              };
            });

          // Asignar las publicaciones al objeto user
          this.user= {
            descripcion: "", medallas: [], nombre: "", usuarioId: "",
            ...this.user,  // Mantén las propiedades actuales del objeto user
            publicaciones: publicacionesDelUsuario  // Agrega las publicaciones filtradas
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
