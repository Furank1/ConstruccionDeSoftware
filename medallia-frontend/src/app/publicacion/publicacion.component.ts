import { Component } from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-publicacion',
  standalone: true,
  imports: [
    NgForOf,
    DatePipe
  ],
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent {
  // Lista de publicaciones simuladas
  posts = [
    { content: 'Esta es la primera publicación.', aplausos: 5,
      im: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEByMBn-eShsLDt5kvNR3-vP7pKiLeeCd9cw&s',
      date: new Date(), user: 'Usuario1', id: 1234567890 },
    { content: 'Segunda publicación, ¿qué les parece?', aplausos: 10, date: new Date(), user: 'Usuario2' },
    { content: '¡Me encanta compartir mis logros aquí!', aplausos: 3, date: new Date(), user: 'Usuario3' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
