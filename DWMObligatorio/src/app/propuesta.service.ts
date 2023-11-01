import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Propuesta } from './propuesta';

@Injectable({
  providedIn: 'root'
})
export class PropuestaService {
  //agregar message service
  constructor(
    private http: HttpClient) { }

  private propuestasUrl = 'http://localhost:3000/proposal';


  getPropuestas(): Observable<Propuesta[]> {
    return this.http.get<Propuesta[]>(this.propuestasUrl)
  }

  addPropuesta(newPropuesta: Propuesta): Observable<Propuesta> {
    return this.http.post<Propuesta>(this.propuestasUrl, newPropuesta);
  }

  modificarPropuesta(updatedPropuesta: Propuesta): Observable<Propuesta> {
    const url = `${this.propuestasUrl}/${updatedPropuesta.id}`;
    return this.http.patch<Propuesta>(url, updatedPropuesta);
  }

  eliminarPropuesta(id: string): Observable<any> {
    const url = `${this.propuestasUrl}/${id}`;
    return this.http.delete(url);
  }


}
