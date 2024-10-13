import { Component, OnInit } from '@angular/core';
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
  userName: string = 'Usuario Ejemplo';
  medals = [
    { name: 'Medalla de Oro', description: 'Obtenida por completar 10 logros.' },
    { name: 'Medalla de Plata', description: 'Obtenida por participar en 5 eventos.' }
  ];

  constructor(private router: Router) { }  

  ngOnInit(): void {
  }

  irAMedallas(): void {
    this.router.navigate(['/medalla']);  
  }

  irAFeed(): void {
    this.router.navigate(['/feed']);  
  }
  irAProfile(): void {
    this.router.navigate(['/profile']);
  }
  irACerrarSesion(): void {
    localStorage.removeItem('loggedInUser');  
    this.router.navigate(['/login']); 
  }

  irAPublicar(): void {
    this.router.navigate(['/publicar']); 
  }
}
