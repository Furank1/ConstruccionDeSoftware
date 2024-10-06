import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, DatePipe, HttpClientModule],
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

          this.posts = data.map(post => ({
            ...post,
            aplaudido: false
          }));
        },
        (error: any) => {
          console.error('Error al cargar publicaciones', error);
        }
      );
  }
  currentPostIndex = 0; // Índice de la publicación actual

  // Método para ir a la publicación anterior
  prevPost() {
    this.currentPostIndex = (this.currentPostIndex > 0) ? this.currentPostIndex - 1 : this.posts.length - 1;
    this.updateCarouselPosition();
  }

  // Método para ir a la siguiente publicación
  nextPost() {
    this.currentPostIndex = (this.currentPostIndex < this.posts.length - 1) ? this.currentPostIndex + 1 : 0;
    this.updateCarouselPosition();
  }

  // Actualiza la posición del carrusel
  updateCarouselPosition() {
    const carousel = document.querySelector('.carousel') as HTMLElement;
    const offset = -this.currentPostIndex * 100; // Calcula el desplazamiento
    carousel.style.transform = `translateX(${offset}%)`; // Aplica el desplazamiento
  }
  addAplausos(post: any) {
    if (!post.aplaudido) {
      post.aplausos += 1;
      post.aplaudido = true;

      this.http.post('http://localhost:8080/publicaciones/aplauso', null, { params: { id: post.id } })
        .subscribe(
          (response) => {
            console.log('Aplausos incrementados en el servidor:', response);
          },
          (error) => {
            console.error('Error al incrementar aplausos en el servidor:', error);
            console.error('Cuerpo de respuesta:', error.error);

            post.aplaudido = true;
          }
        );
    }
  }
}
