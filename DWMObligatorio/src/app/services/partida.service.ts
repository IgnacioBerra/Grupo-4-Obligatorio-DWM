import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { Partida } from '../interfaces/partida';
import { Votos } from '../interfaces/votos';
import { Observable } from 'rxjs/internal/Observable';

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

  postPartida(nuevaPartida: Partida){
    
    return this.http.post(`${this.gameUrl}/actividades`, nuevaPartida);
  }
  
  addVoto(votos: Votos[] ,idSesion: string, userId: string){

    votos.forEach(voto => {
      const actividad = voto.actividad;
      const votosData = voto.votos;
      const valorVoto = votosData[userId];

       const body = {
         voto: valorVoto,
         actividad: actividad        
       };

      // const body = {
      //   votoUser: votosData,
      //   actividad: actividad
      // }

      console.log("BODY DEL VOTO AGREGADO: ", body)
      this.http.patch(`${this.gameUrl}/actividades/${idSesion}`, body).subscribe({
        next: (response) => {
          console.log("Guardado de votos", response);       
                     
        },
        error: (error) => {
          console.log(error); 
          console.log("ESTE ES EL ERROR", error.error);
        }
      });
    });

  }

  //nuevo
  //método para contar los votos después de que las actividades han terminado
  countVotes(idSesion: string, nombreActividad: string[]): Observable<any> {
    const actividades: any[] = []

    nombreActividad.forEach((a) => {
      let actividad = {
        actividad: a
      }
      actividades.push(actividad);
    });

    console.log("CONTAR VOTOS MEDIANTE LAS ACTIVIDADES;: ", actividades)
    return this.http.post(`${this.gameUrl}/countVotes/${idSesion}`,  actividades);
  }
  //nuevo
}
  