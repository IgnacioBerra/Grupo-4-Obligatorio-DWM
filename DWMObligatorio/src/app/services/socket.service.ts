import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environment/environment';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Activity } from '../interfaces/activity';
import { PropuestaService } from './propuesta.service';
import { Propuesta } from '../interfaces/propuesta';
import { ActivitiyService } from './activitiy.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  
  socket: any;
  private readonly USER_COUNT_KEY = 'userCount';
  private _userCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public userCount$ = this._userCount.asObservable();

    // Agrega un nuevo BehaviorSubject para notificar al componente SalaEsperaComponent
    private _actividadActual: BehaviorSubject<Activity | null> = new BehaviorSubject<Activity | null>(null);
    public actividadActual$ = this._actividadActual.asObservable();
    //para mostrar tarjetas en html
  

  actividad : Activity[] | undefined;
  propuesta: Propuesta | undefined;
 

   constructor(private proposalService: PropuestaService, private activityService: ActivitiyService) {       
      this.socket = io(`http://${environment.url}:3000`);
   
      this.socket.on('user-count', (count: number) => {
        this._userCount.next(count);
      });

      this.socket.on('disconnect', () => {
        this.socket.disconnect();
      });

     this.retrieveStoredUserCount();
    //this.escucharInicioActividad();
    
    }

    public escucharInicioActividad(){
      this.socket.on('iniciarActividad', (propuestaID:string) => {

        //this.imprimirElementosConRetraso(this.miArray, 0);     

        const accessToken = localStorage.getItem('access_token');
        if(accessToken){
          this.proposalService.getPropuesta( accessToken , propuestaID).subscribe( async (data: Propuesta) => { //suscribe porq es un Observable
            this.propuesta = data;
            //console.log(this.propuesta);
            
            //para mostrar tarjetas en html
            if (this.propuesta && this.propuesta.activities) {
              this.socket.emit("actividad-pantalla", this.propuesta.activities);
              this.showActividad();
              //this.imprimirActividadesConRetraso(this.propuesta.activities, 0);
            }
            //para mostrar tarjetas en html
          },
          error => {
            console.error('Error al obtener la propuesta:', error);
          }
        );              
        }  
      });
    }

    //para mostrar tarjetas en html
    private showActividad(){
       this.socket.on("mostrar-actividades", (actividades: any) => {
         this.imprimirActividadesConRetraso(actividades, 0);
       });
    }
    //para mostrar tarjetas en html


  increaseUserCount(id: string): void {
    this._userCount.next(this._userCount.getValue() + 1);
    this.sendUser(id);
  }

  retrieveStoredUserCount(): void {
  const storedUserCount = localStorage.getItem(this.USER_COUNT_KEY);
  console.log('Stored user count:', storedUserCount); // Verifica si se está recuperando el valor de localStorage
  if (storedUserCount) {
    this._userCount.next(parseInt(storedUserCount, 10));
  }
}

  private sendUser(id: string): void {
    this.socket.emit('usuario-conectado', id);
  }



  public iniciarJuego(propuestaId:string){      
    this.socket.emit("iniciarJuego", propuestaId);
  
}

  public iniciarActividad(actividadId:string)
  {
    this.socket.broadcast.emit("iniciarActividad",actividadId)
  }

  //para mostrar tarjetas en html
  public imprimirActividadesConRetraso(actividades: Activity[], index: number): void {
    if (actividades && index < actividades.length) {
      setTimeout(() => {
        // Actualiza la actividad actual
        this._actividadActual.next(actividades[index]);
        this.imprimirActividadesConRetraso(actividades, index + 1);
      }, 2000); // 10 segundos
    }
  }
  

}
