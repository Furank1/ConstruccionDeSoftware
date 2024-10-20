import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import dayjs from 'dayjs';

@Component({
  selector: 'app-publicacion',
  standalone: true,
  imports:[CommonModule],
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
  @Output() aplauso = new EventEmitter<void>();

  haAplaudido: boolean = false;
  fechaFormateada!: string;
  mostrarModal: boolean = false; //  visibilidad del modal

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fechaFormateada = dayjs(this.fecha).format('DD/MM/YYYY HH:mm');
  }

  onAplaudir() {
    if (!this.haAplaudido) {  
      this.aplausos++;
      this.haAplaudido = true;
      this.aplauso.emit();

      this.http.post(`http://localhost:8080/publicaciones/aplauso?id=${this.postId}`, {})
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

  // abrir el modal
  abrirModal() {
    this.mostrarModal = true;
  }

  // cerrar el modal
  cerrarModal() {
    this.mostrarModal = false;
  }
}
