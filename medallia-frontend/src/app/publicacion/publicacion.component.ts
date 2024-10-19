import { Component, EventEmitter, Input, Output,OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import dayjs from 'dayjs';

@Component({
  selector: 'app-publicacion',
  standalone: true,
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit{

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


  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    this.fechaFormateada = dayjs(this.fecha).format('DD/MM/YYYY HH:mm');
  }

  onAplaudir() {
    if (!this.haAplaudido) {  // Si, es un contador simple que no valida si ya se aplaudió antes por este usuario
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
}
