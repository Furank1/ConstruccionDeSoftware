import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone:true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private router: Router) {}

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
