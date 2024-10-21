import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import dayjs from 'dayjs';

@Component({
  selector: 'app-publicacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {

  @Input() imagen!: string;
  @Input() usuarioId!: string;
  @Input() nombreUsuario!: string;
  @Input() descripcion!: string;
  @Input() fecha!: Date;
  @Input() aplausos!: number;
  @Input() postId!: string;
  @Input() publicacionesAplaudidas!: string[];  // Tipo array de strings
  @Output() aplauso = new EventEmitter<void>();

  haAplaudido: boolean = false;
  fechaFormateada!: string;
  mostrarModal: boolean = false;  // Visibilidad del modal
  loggedInUser = localStorage.getItem('loggedInUser');

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fechaFormateada = dayjs(this.fecha).format('DD/MM/YYYY HH:mm');

    // Verificar si la publicación ha sido aplaudida por el usuario
    if (this.publicacionesAplaudidas.includes(this.postId)) {
      this.haAplaudido = true;
    }
  }

  onAplaudir() {
    if (!this.haAplaudido) {
      this.aplausos++;
      this.haAplaudido = true;
      this.aplauso.emit();

      // Crear el objeto para enviar al backend
      const aplausosDTO = {
        publicacionId: this.postId,
        usuarioId: this.loggedInUser
      };

      // Realizar la solicitud HTTP POST
      this.http.post('http://localhost:8080/publicaciones/aplaudidas', aplausosDTO)
        .subscribe({
          next: (response) => {
            console.log('Aplausos actualizados exitosamente', response);
          },
          error: (error) => {
            console.error('Error al actualizar los aplausos', error);
          }
        });
    }
  }

  // Abrir el modal
  abrirModal() {
    this.mostrarModal = true;
  }

  // Cerrar el modal
  cerrarModal() {
    this.mostrarModal = false;
  }
}
