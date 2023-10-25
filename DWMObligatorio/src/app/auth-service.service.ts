import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    this.http.post('/api/login', { username, password }).subscribe((data: any) => {
      const token = data.token; // Obtiene el token de la respuesta del backend
      localStorage.setItem('token', token); // Almacena el token en el localStorage para uso posterior
    });
  }
}
