import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { NgForOf } from '@angular/common';
import { PublicacionComponent } from '../publicacion/publicacion.component';
import { Router } from '@angular/router';  // Importar Router

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
  user: {
    medallas: any[];
    descripcion: any[];
    publicaciones: any[];
    usuarioId: string;
    nombre: string[];
    post: any[];
  } | undefined




  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  irAFeed(): void {
    this.router.navigate(['/feed']);
  }

  irACerrarSesion(): void {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }

  irAPublicar(): void {
    this.router.navigate(['/publicar']);
  }
}
