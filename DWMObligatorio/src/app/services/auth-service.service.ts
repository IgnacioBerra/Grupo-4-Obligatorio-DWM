import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  //private baseUrl = 'http://localhost:3000';
  private baseUrl = `http://${environment.url}:3000`; //me agarra la variable de dev, si quiero que agarre la de prod cambio el import

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    this.http.post('/login', { username, password }).subscribe((data: any) => {
      const token = data.token; // Obtiene el token de la respuesta del backend
      localStorage.setItem('token', token); // Almacena el token en el localStorage para uso posterior
    });
  }

  getQrFilePath(token: string, sessionId: string, propuestaId: string) :Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    console.log("propuets" , propuestaId);
    return this.http.get<any>(`${this.baseUrl}/game?sessionId=${sessionId}&propuestaId=${propuestaId}`, { headers });
  }

}