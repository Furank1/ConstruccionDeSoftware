import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';
import { PublicacionComponent } from '../publicacion/publicacion.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, DatePipe, HttpClientModule, RouterLink, PublicacionComponent, NavbarComponent],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  posts: any[] = [];
  loggedInUser = localStorage.getItem('loggedInUser');
  publicacionesAplaudias = [];
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    if (!this.loggedInUser) {
      this.router.navigate(['/login']);
    } else {
      this.cargarPublicaciones();
      this.cargarPublicacionesAplaudidas(this.loggedInUser)
    }
  }

  cargarPublicaciones(): void {
    this.http.get<any[]>('http://localhost:8080/publicaciones/get')
      .subscribe(
        (data: any[]) => {
          console.log('Publicaciones cargadas', data);

          this.posts = data.map(post => ({
            ...post,
            publicacionesAplaudidas: this.publicacionesAplaudias,
            aplaudido: false,
            nombreUsuario: this.extraerNombreUsuario(post.nombreUsuario)
          })).sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());


        },
        (error: any) => {
          console.error('Error al cargar publicaciones', error);
        }
      );
  }

  cargarPublicacionesAplaudidas(userId: string | null): void {
    this.http.get<string[]>(`http://localhost:8080/cuenta/pubaplaudidas?id=${userId}`)
      .subscribe(
        (data: string[]) => {
          console.log('Publicaciones aplaudidas:', data);
          // @ts-ignore
          this.publicacionesAplaudias = data;
        },
        (error: any) => {
          console.error('Error al cargar publicaciones aplaudidas', error);
        }
      );
  }

  extraerNombreUsuario(correo: string): string {
    if (!correo || typeof correo !== 'string') {
      return 'Usuario desconocido';
    }
    return correo.split('@')[0];
  }
}
