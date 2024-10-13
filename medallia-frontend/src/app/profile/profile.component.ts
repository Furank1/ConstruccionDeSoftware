import { Component, OnInit } from '@angular/core';
import {NgForOf} from "@angular/common";
import {PublicacionComponent} from "../publicacion/publicacion.component";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: true,
    imports: [
        NgForOf,
        PublicacionComponent
    ],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userName: string = 'Usuario Ejemplo';
  medals = [
    { name: 'Medalla de Oro', description: 'Obtenida por completar 10 logros.' },
    { name: 'Medalla de Plata', description: 'Obtenida por participar en 5 eventos.' }
  ];

  constructor() { }

  ngOnInit(): void {
  }
}

