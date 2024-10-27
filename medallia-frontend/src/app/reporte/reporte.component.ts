import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from "@angular/common";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-reporte',
  standalone: true,
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css'],
  imports: [HttpClientModule, CommonModule, NavbarComponent]
})
export class ReporteComponent implements OnInit {
  private apiUrl = 'http://localhost:8080/reporte/all';
  reportes: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.obtenerReportes();
  }

  obtenerReportes() {
    this.http.get<any[]>(this.apiUrl).subscribe(
        (response) => {
          this.reportes = response.map(reporte => ({
            ...reporte,
            nombreUsuario: this.extraerNombreUsuario(reporte.nombreUsuario)
          }));

          console.log('Reportes obtenidos:', this.reportes);
        },
        (error) => {
          console.error('Error al obtener los reportes:', error);
        }
    );
  }

  extraerNombreUsuario(correo: string): string {
    if (!correo || typeof correo !== 'string') {
      return 'Usuario desconocido';
    }
    return correo.split('@')[0];
  }
}
