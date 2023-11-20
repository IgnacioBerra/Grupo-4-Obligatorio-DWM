

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Propuesta } from '../interfaces/propuesta';

@Injectable({
  providedIn: 'root'
})
export class PropuestaService {
  constructor(private http: HttpClient) { }

  private propuestasUrl = 'http://localhost:3000/proposal';
  private gameUrl = 'http://localhost:3000/game';


  postStart(id: string): void {
    this.http.post(`${this.gameUrl}/start`, { id }).subscribe(
      response => {
        console.log('Solicitud POST exitosa:', response);
        // Puedes realizar otras acciones después de una solicitud exitosa si es necesario
      },
      error => {
        console.error('Error en la solicitud POST:', error);
        console.error('Cuerpo de la respuesta:', error.error);
      }
    );
    
  }

  getPropuestas(token: string): Observable<Propuesta[]> {
    // Agrega el token de autenticación en la cabecera de la solicitud
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.get<Propuesta[]>(this.propuestasUrl, { headers });
  }

  getPropuesta(token: string, id: string): Observable<Propuesta> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Propuesta>(`${this.propuestasUrl}/${id}`, {headers});
  }


  addPropuesta(token: string, newPropuesta: Propuesta): Observable<Propuesta> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.post<Propuesta>(this.propuestasUrl, newPropuesta, { headers });
  }

  modificarPropuesta(token: string, updatedPropuesta: Propuesta): Observable<Propuesta> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.propuestasUrl}/${updatedPropuesta.id}`;
    return this.http.patch<Propuesta>(url, updatedPropuesta, { headers });
  }

  eliminarPropuesta(token: string, id: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    const url = `${this.propuestasUrl}/${id}`;
    return this.http.delete(url, { headers });
  }
}
