import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { Partida } from '../interfaces/partida';

@Injectable({
  providedIn: 'root'
})
export class PartidaService {

  constructor(private http: HttpClient) { }

  private gameUrl = `http://${environment.url}:3000/game`;


  postStart(token: string, id: string): void {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.post(`${this.gameUrl}/start`, { id }, {headers}).subscribe(
      response => {
        console.log('Solicitud POST exitosa:', response);
      },
      error => {
        console.error('Error en la solicitud POST:', error);
        console.error('body de la respuesta:', error.error);
      }
    );    
  }

  postPartida(token: string, nuevaPartida: Partida){

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.gameUrl}/actividades`, nuevaPartida, { headers });
  }
  
  addVoto(token: string, voto: number, idSesion: string, actividad: string){
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    let body = {
      voto,
      actividad 
    };

    console.log(`${this.gameUrl}/actividades/${idSesion}`);
    console.log("BODDYYY", { headers });

    this.http.patch(`${this.gameUrl}/actividades/${idSesion}`, body, { headers }).subscribe({
      next: (response) => {
        console.log(" BIEN ", response);        
      },
      error: (error) => {
        console.log(error);
        console.log(error.error)
      }
    });
  }
}
