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

  private propuestasUrl = 'http://localhost:3000/api/proposal';  // URL to web api

  getPropuestas(): Observable<Propuesta[]> {
    return this.http.get<Propuesta[]>(this.propuestasUrl)
  }
 
}
