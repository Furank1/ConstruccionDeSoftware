import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from '@angular/common';
import { PublicacionComponent } from '../publicacion/publicacion.component';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from "@angular/common/http";

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
  user: any = undefined;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    const loggedInUser = localStorage.getItem('loggedInUser');
      const userData = localStorage.getItem('loggedInUser');
      console.log('Contenido de loggedInUser:', userData);

      if (userData) {
        try {
          this.user = JSON.parse(userData);
          console.log(this.user);
        } catch (error) {
          console.error('Error al parsear JSON:', error);
          this.user = {};
        }
      } else {
        this.user = {};
      }

    if (loggedInUser) {
      this.user = JSON.parse(loggedInUser);
      this.cargarDatosUsuario();
    } else {
      console.error('No hay usuario logueado en el localStorage');
      this.router.navigate(['/login']);
    }
  }


  cargarDatosUsuario(): void {
    if (!this.user || !this.user.usuarioId) {
      console.error('usuarioId no está disponible');
      return;
    }

    this.http.get<any>(`http://localhost:8080/perfil/get?id=${this.user.usuarioId}`)
      .subscribe(
        (data: any) => {
          if (data) {
            console.log('Datos del usuario cargados', data);
            
            this.user = {
              nombre: data.nombre || 'Usuario Desconocido',
              usuarioId: this.user.usuarioId,
              descripcion: data.biografia || '',
              medallas: data.medallas || [],
              publicaciones: []
            };
          } else {
            console.error('El objeto de datos de usuario no contiene la información esperada', data);
          }
        },
        (error: any) => {
          console.error('Error al cargar los datos del usuario', error);
        }
      );
  }



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
