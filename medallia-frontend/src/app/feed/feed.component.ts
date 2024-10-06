import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http'; // Importar HttpClientModule

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, DatePipe, HttpClientModule], // Añadir HttpClientModule aquí
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  posts: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarPublicaciones();
  }

  cargarPublicaciones(): void {
    this.http.get<any[]>('http://localhost:8080/publicaciones/get')
      .subscribe(
        (data: any[]) => {
          console.log('Publicaciones cargadas', data);
          this.posts = data;
        },
        (error: any) => {
          console.error('Error al cargar publicaciones', error);
        }
      );
  }

  addAplausos(post: any) {
    post.aplausos += 1;
  }
}
