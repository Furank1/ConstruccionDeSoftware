import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {Router, RouterLink} from "@angular/router";
import {PublicacionComponent} from "../publicacion/publicacion.component";
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

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    const loggedInUser = localStorage.getItem('loggedInUser');
        if (!loggedInUser) {
      this.router.navigate(['/login']);  // chao no estas logeao
    }
    this.cargarPublicaciones();
  }

  cargarPublicaciones(): void {
    this.http.get<any[]>('http://localhost:8080/publicaciones/get')
      .subscribe(
        (data: any[]) => {
          console.log('Publicaciones cargadas', data);

          this.posts = data.map(post => ({
            ...post,
            aplaudido: false,
            nombreUsuario: this.extraerNombreUsuario(post.nombreUsuario)
          })).sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());

        },
        (error: any) => {
          console.error('Error al cargar publicaciones', error);
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
