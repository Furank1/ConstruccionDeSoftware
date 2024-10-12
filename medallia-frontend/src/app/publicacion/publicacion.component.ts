import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  standalone: true,
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent {
  @Input() imageUrl!: string;
  @Input() titulo!: string;
  @Input() descripcion!: string;
  @Input() categoria!: string;
  @Input() aplausos!: number;  // Recibe el número de aplausos desde el componente padre

  // Función que incrementa el número de aplausos
  onAplaudir() {
    this.aplausos++;
  }
}
