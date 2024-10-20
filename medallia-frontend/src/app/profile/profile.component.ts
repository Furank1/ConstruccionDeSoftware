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
  user: any = {};
  loggedInUser = localStorage.getItem('loggedInUser');
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {

    if (!this.loggedInUser) {
      this.router.navigate(['/login']);  // chao no estas logeao
    }
    this.cargarDatosUsuario();



  }


  cargarDatosUsuario(): void {

    this.http.get<any>(`http://localhost:8080/perfil/get?id=${this.loggedInUser}`)
      .subscribe(
        (data: any) => {
          if (data) {
            console.log('Datos del usuario cargados', data);

            this.user = {
              nombre: data.nombre || 'Usuario Desconocido',
              usuarioId: this.loggedInUser,
              descripcion: data.biografia || '',
              medallas: data.medallas || [],
              publicaciones: data.publicacionesUsuario || []
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
  irAPerfil(): void {
    this.router.navigate(['/profile']);
  }
  irAMedalla(): void{
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
