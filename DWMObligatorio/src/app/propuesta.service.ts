

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Propuesta } from './propuesta';

@Injectable({
  providedIn: 'root'
})
export class PropuestaService {
  constructor(private http: HttpClient) { }

  private propuestasUrl = 'http://localhost:3000/proposal';

  getPropuestas(token: string): Observable<Propuesta[]> {
    // Agrega el token de autenticación en la cabecera de la solicitud
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    
    return this.http.get<Propuesta[]>(this.propuestasUrl, { headers });
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
