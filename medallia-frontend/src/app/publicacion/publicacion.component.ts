// publicacion.component.ts
import { Component, OnInit } from '@angular/core';
import {CommonModule, DatePipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";  // Importar CommonModule
import { HttpClientModule } from '@angular/common/http';
import { PublicacionService } from '../../publicacion.service';
//import { PublicacionService } from './publicacion.service';
// @ts-ignore

@Component({
  selector: 'app-publicacion',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    NgForOf,
    NgOptimizedImage
  ],
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {
  // Lista de publicaciones
  posts: any[] = [];

constructor(private publicacionService: PublicacionService) {}


  ngOnInit(): void {
    this.cargarPublicaciones(); // Cargar las publicaciones al iniciar
  }

  // Método para cargar las publicaciones
  cargarPublicaciones(): void {
    this.publicacionService.getPublicaciones().subscribe(
      (data: any[]) => {
        this.posts = data;
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
  // aplausos hardcodeados...
  addAplausos(post: any) {
    post.aplausos += 1;
  }
}
