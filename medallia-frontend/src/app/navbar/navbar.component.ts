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

  constructor(private router: Router) {
    // nombredeusuariologueao
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

  irACerrarSesion() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }
}
