// publicacion.component.ts
import { Component, OnInit } from '@angular/core';
import { DatePipe } from "@angular/common";
import { PublicacionService } from '../../publicacion.service';
//import { PublicacionService } from './publicacion.service';


@Component({
  selector: 'app-publicacion',
  standalone: true,
  imports: [
    DatePipe
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

  // aplausos hardcodeados... 
  addAplausos(post: any) {
    post.aplausos += 1; 
  }
}
