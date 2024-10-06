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
