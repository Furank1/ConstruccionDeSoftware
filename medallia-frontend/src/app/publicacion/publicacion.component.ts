import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import dayjs from 'dayjs';
import { FormsModule } from "@angular/forms";

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
  @Input() publicacionesAplaudidas!: string[];
  @Output() aplauso = new EventEmitter<void>();

  haAplaudido: boolean = false;
  fechaFormateada!: string;
  mostrarModal: boolean = false;
  loggedInUser = localStorage.getItem('loggedInUser');
  mostrarOpciones = false;
  mostrarFormularioReporte = false;
  motivoReporte = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fechaFormateada = dayjs(this.fecha).format('DD/MM/YYYY HH:mm');
    this.haAplaudido = this.publicacionesAplaudidas?.includes(this.postId) ?? false;
  }

  onAplaudir() {
    const aplausosDTO = {
      publicacionId: this.postId,
      usuarioId: this.loggedInUser
    };
  
    if (!this.haAplaudido) {
      // Incrementar aplauso
      this.aplausos++;
      this.haAplaudido = true;
  
      this.http.post('http://localhost:8080/publicaciones/aplaudidas', aplausosDTO)
        .subscribe({
          next: (response) => {
            console.log('Aplausos actualizados exitosamente', response);
          },
          error: (error) => {
            console.error('Error al actualizar los aplausos', error);
          }
        });
    } else {
      // Disminuir aplauso
      this.aplausos--;
      this.haAplaudido = false;
  
      this.http.post('http://localhost:8080/publicaciones/disminuiraplauso', aplausosDTO)
        .subscribe({
          next: (response) => {
            console.log('Aplauso eliminado exitosamente', response);
          },
          error: (error) => {
            console.error('Error al eliminar el aplauso', error);
          }
        });
    }
  }
  

  abrirModal() {
    this.mostrarModal = true;
  }

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
      const reporteDTO = {
        usuarioId: this.loggedInUser || '',
        publicacionId: this.postId,
        fecha: new Date().toISOString(),
        descripcion: this.motivoReporte
      };

      this.http.post('http://localhost:8080/reporte/register', reporteDTO)
        .subscribe({
          next: (response) => {
            console.log('Reporte enviado exitosamente', response);
          },
          error: (error) => {
            console.error('Error al enviar el reporte', error);
          }
        });

      this.cerrarFormulario();
    }
  }

  cerrarFormulario() {
    this.mostrarFormularioReporte = false;
    this.motivoReporte = '';
  }
}
