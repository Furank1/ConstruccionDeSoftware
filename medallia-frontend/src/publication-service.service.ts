// src/app/publicacion.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {
  private apiUrl = 'https://gustavoOjoacohaganleconelbackend'; // url del endpoint aquí

  constructor(private http: HttpClient) {}

  getPublicaciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
