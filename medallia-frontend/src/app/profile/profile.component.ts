  import { Component, OnInit } from '@angular/core';
  import { NgForOf, NgIf } from '@angular/common';
  import { PublicacionComponent } from '../publicacion/publicacion.component';
  import { Router } from '@angular/router';
  import { HttpClient, HttpClientModule } from "@angular/common/http";
  import { FormsModule } from '@angular/forms';

  @Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    standalone: true,
    imports: [
      HttpClientModule,
      NgForOf,
      PublicacionComponent,
      NgIf,
      FormsModule // Agrega FormsModule aquí
    ],
    styleUrls: ['./profile.component.css']
  })
  export class ProfileComponent implements OnInit {
    user: any = {};
    loggedInUser = localStorage.getItem('loggedInUser');
    nombreUsuario = localStorage.getItem('userEmail');
    editando = false; // Control para el modo edición

    constructor(private router: Router, private http: HttpClient) {}

    ngOnInit(): void {
      if (!this.loggedInUser) {
        this.router.navigate(['/login']);  // Redirigir si no está logueado
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
                nombre: this.extraerNombreUsuario(this.nombreUsuario) ,
                usuarioId: this.loggedInUser,
                descripcion: data.biografia || '',
                imagen: data.imagen || '',
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

    toggleEditar(): void {
      this.editando = !this.editando;
    }

    guardarCambios(): void {
      const perfilActualizado = {
        id: this.loggedInUser,
        biografia: this.user.descripcion,
        imagen: this.user.imagen
      };

      // Realizar la solicitud POST al back-end
      this.http.post('http://localhost:8080/perfil/update', perfilActualizado)
        .subscribe(
          (response: any) => {
            console.log('Perfil actualizado correctamente', response);
            this.editando = false; // Desactivar el modo edición tras guardar los cambios
          },
          (error: any) => {
            console.error('Error al actualizar el perfil', error);
          }
        );
    }

    extraerNombreUsuario(correo: string | null): string {
      if (!correo || typeof correo !== 'string') {
        return 'Usuario desconocido';
      }
      return correo.split('@')[0];
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
