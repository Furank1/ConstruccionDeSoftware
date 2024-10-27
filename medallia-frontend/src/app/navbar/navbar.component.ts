import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  loggedInUser: string | null = null;
  nombreUsuario = localStorage.getItem('userEmail');

  constructor(private router: Router) {
    this.nombreUsuario= this.extraerNombreUsuario(this.nombreUsuario);
    this.loggedInUser = localStorage.getItem('loggedInUser');
  }

  irAProfile() {
    this.router.navigate(['/profile']);
  }

  irAFeed() {
    this.router.navigate(['/feed']);
  }

  irAMedallas() {
    this.router.navigate(['/medalla']);
  }

  irAPublicar() {
    this.router.navigate(['/publicar']);
  }

  irAReporte() {
    this.router.navigate(['/reporte']);
  }

  irACerrarSesion() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }
  extraerNombreUsuario(correo: string | null): string {
    if (!correo || typeof correo !== 'string') {
      return 'Usuario desconocido';
    }
    return correo.split('@')[0];
  }
}
