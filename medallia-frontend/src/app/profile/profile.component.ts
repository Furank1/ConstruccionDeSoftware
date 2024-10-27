  import { Component, OnInit } from '@angular/core';
  import { NgForOf, NgIf } from '@angular/common';
  import { PublicacionComponent } from '../publicacion/publicacion.component';
  import { Router } from '@angular/router';
  import { HttpClient, HttpClientModule } from "@angular/common/http";
  import { FormsModule } from '@angular/forms';
  import { NavbarComponent } from '../navbar/navbar.component';

  @Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    standalone: true,
    imports: [
      HttpClientModule,
      NgForOf,
      PublicacionComponent,
      NgIf,
      FormsModule, NavbarComponent],
    styleUrls: ['./profile.component.css']
  })
  export class ProfileComponent implements OnInit {
onAplausoRecibido(arg0: any) {
throw new Error('Method not implemented.');
}
    user: any = {};
    medallas: any[] = []; // Medallas globales
    loggedInUser = localStorage.getItem('loggedInUser');
    nombreUsuario = localStorage.getItem('userEmail');
    editando = false; // Control para el modo edición
    mostrarMedallas = false;
publicacion: any;
  
    constructor(private router: Router, private http: HttpClient) {}

    ngOnInit(): void {
      if (!this.loggedInUser) {
        this.router.navigate(['/login']);
      }
      this.cargarMedallas();
      this.cargarDatosUsuario();
    }

    cargarMedallas(): void {
      this.http.get<any[]>('http://localhost:8080/medallas/obtenermedallas')
        .subscribe(
          (data: any[]) => {
            this.medallas = data;
          },
          (error: any) => {
            console.error('Error al cargar las medallas', error);
          }
        );
    }

    cargarDatosUsuario(): void {
      this.http.get<any>(`http://localhost:8080/perfil/get?id=${this.loggedInUser}`)
        .subscribe(
          (data: any) => {
            if (data) {
              console.log('Datos del usuario cargados', data);
              this.user = {
                nombre: this.extraerNombreUsuario(this.nombreUsuario),
                usuarioId: this.loggedInUser,
                descripcion: data.biografia || '',
                imagen: data.imagen || '',
                medallasUsuario: this.agruparMedallas(data.medallasUsuario || []), // Agrupar las medallas
                publicaciones: data.publicacionesUsuario || []
              };

              this.vincularNombresMedallas();
            } else {
              console.error('El objeto de datos de usuario no contiene la información esperada', data);
            }
          },
          (error: any) => {
            console.error('Error al cargar los datos del usuario', error);
          }
        );
    }

    agruparMedallas(medallas: string[]): { id: string, count: number }[] {
      const medallasMap: { [id: string]: number } = {};


      medallas.forEach(id => {
        if (medallasMap[id]) {
          medallasMap[id]++;
        } else {
          medallasMap[id] = 1;
        }
      });

      return Object.keys(medallasMap).map(id => ({
        id,
        count: medallasMap[id]
      }));
    }

    vincularNombresMedallas(): void {
      this.user.medallasUsuario = this.user.medallasUsuario.map((medallaUsuario: { id: any; }) => {
        const medallaCompleta = this.medallas.find(medalla => medalla.id === medallaUsuario.id);
        return {
          ...medallaUsuario,
          nombre: medallaCompleta ? medallaCompleta.nombre : 'Desconocida'
        };
      });
    }

    toggleMostrarMedallas(): void {
      this.mostrarMedallas = !this.mostrarMedallas;
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
  }
