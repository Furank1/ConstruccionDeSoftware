import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgIf, CommonModule } from '@angular/common'; // Asegúrate de importar CommonModule

@Component({
  selector: 'app-publicar',
  templateUrl: './publicar.component.html',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    HttpClientModule,
    CommonModule // Añadir CommonModule aquí
  ],
  styleUrls: ['./publicar.component.css']
})
export class PublicarComponent {
  imageUrl: string | null = null;
  descripcion: string = '';
  medallas: any[] = []; // Almacena las medallas
  medallaSeleccionada: string | null = null; // Almacena el ID de la medalla seleccionada

  constructor(private http: HttpClient) {
    this.cargarMedallas();
  }

  // Método para cargar las medallas desde el backend
  cargarMedallas(): void {
    this.http.get<any[]>('http://localhost:8080/medallas/obtenermedallas')
      .subscribe(medallas => {
        this.medallas = medallas; // Guardar las medallas recibidas
      }, error => {
        console.error('Error al cargar las medallas', error);
      });
  }

  // Método para seleccionar una medalla
  seleccionarMedalla(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; // Casting a HTMLSelectElement
    this.medallaSeleccionada = selectElement.value; // Obtener el valor del select
    console.log('Medalla seleccionada:', this.medallaSeleccionada);
  }

  // Propiedad calculada para obtener el nombre de la medalla seleccionada
  get nombreMedallaSeleccionada(): string {
    const medalla = this.medallas.find(m => m.id === this.medallaSeleccionada);
    return medalla ? medalla.nombre : 'Ninguna medalla seleccionada';
  }

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
  // Método para enviar el formulario
  onSubmit(): void {
    const publicacionData = {
      descripcion: this.descripcion,
      imageUrl: this.imageUrl,
      medallaId: this.medallaSeleccionada,
      usuarioId: localStorage.getItem('loggedInUser'),
      fecha: new Date().toISOString(), // Incluyendo la fecha actual
      aplausos: 0 // Inicialmente sin aplausos
    };

    // Enviar los datos de la publicación al backend
    this.http.post('http://localhost:8080/publicaciones/register', publicacionData)
      .subscribe(response => {
        console.log('Publicación creada:', response);
      }, error => {
        console.error('Error al crear la publicación:', error);
      });
  }

}
