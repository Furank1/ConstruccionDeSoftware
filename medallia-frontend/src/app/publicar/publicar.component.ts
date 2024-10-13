import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    HttpClientModule
  ],
  styleUrls: ['./publicar.component.css']
})
export class PublicarComponent {
  imageUrl: string | null = null;
  descripcion: string = '';

  constructor(private http: HttpClient) {}

  // Método para seleccionar el archivo
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);

      // Subir la imagen al backend
      this.http.post<{ imageUrl: string }>('http://localhost:8080/publicaciones/post', formData)
        .subscribe(response => {
          this.imageUrl = response.imageUrl; // Guardar la URL de la imagen
        });
    }
  }

  // Método para enviar el formulario
  onSubmit(): void {
    const publicacionData = {
      descripcion: this.descripcion,
      imageUrl: this.imageUrl
    };

    // Enviar los datos de la publicación al backend
    this.http.post('http://localhost:8080/publicaciones/get', publicacionData) // Corregido aquí
      .subscribe(response => {
        console.log('Publicación creada:', response);
      });
  }
}
