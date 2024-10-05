
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {
  private apiUrl = 'http://tudominio.com/api/publicaciones'; // Cambia esto a tu URL del backend

  constructor(private http: HttpClient) {}

  // Método para obtener las publicaciones
  getPublicaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
