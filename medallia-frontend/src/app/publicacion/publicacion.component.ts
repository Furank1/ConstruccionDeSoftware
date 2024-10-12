import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent {

  @Input() imagen!: string;
  @Input() usuarioId!: string;
  @Input() descripcion!: string;
  @Input() fecha!: Date;
  @Input() aplausos!: number;  // Recibe el número de aplausos desde el componente padre
  posts: any[] = [];
  // Función que incrementa el número de aplausos
  @Output() aplauso = new EventEmitter<void>();
  onAplaudir() {
    this.aplausos++;
  }
  ngOnInit(): void {
    this.cargarPublicaciones();
  }

  constructor(private http: HttpClient) {
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
}
