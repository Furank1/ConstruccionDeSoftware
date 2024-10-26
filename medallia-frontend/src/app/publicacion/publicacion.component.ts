import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import dayjs from 'dayjs';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-publicacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  mostrarModal: boolean = false;  // Visibilidad del modal
  loggedInUser = localStorage.getItem('loggedInUser');
  mostrarOpciones = false;
  mostrarFormularioReporte = false;
  motivoReporte = '';

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

  abrirOpciones() {
    this.mostrarOpciones = !this.mostrarOpciones;
  }

  abrirFormularioReporte(postId: string) {
    this.mostrarOpciones = false;
    this.mostrarFormularioReporte = true;
    this.postId = postId;
  }

  enviarReporte() {
    if (this.postId && this.motivoReporte.trim()) {
      console.log('Reporte enviado para la publicación:', this.postId);
      console.log('Motivo del reporte:', this.motivoReporte);
      this.cerrarFormulario();
    }
  }

  cerrarFormulario() {
    this.mostrarFormularioReporte = false;
    this.motivoReporte = '';
  }

}
