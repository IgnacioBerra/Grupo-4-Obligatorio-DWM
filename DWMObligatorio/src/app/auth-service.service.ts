import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private baseUrl = 'http://localhost:3000'; 

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    this.http.post('/login', { username, password }).subscribe((data: any) => {
      const token = data.token; // Obtiene el token de la respuesta del backend
      localStorage.setItem('token', token); // Almacena el token en el localStorage para uso posterior
    });
  }

   getQrFilePath(): Observable<string> {
     return this.http.get<string>(`${this.baseUrl}/game`);
   }
}
