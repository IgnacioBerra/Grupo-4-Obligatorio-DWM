import { Component } from '@angular/core';
import { ActivitiyService } from '../../services/activitiy.service';
import { Observable, Subscription } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';
import { Activity } from 'src/app/interfaces/activity';
import { Partida } from 'src/app/interfaces/partida';
import { PartidaService } from 'src/app/services/partida.service';
import { Votos } from 'src/app/interfaces/votos';

@Component({
  selector: 'app-show-activities',
  templateUrl: './show-activities.component.html',
  styleUrls: ['./show-activities.component.css']
})
export class ShowActivitiesComponent {
  
  actividadGanadora :string ='';
  cantidadVotos: number | null = null;
  actividades: Activity[] = [];
  actividadesSubscription: Subscription | undefined;
  propuestaId: string | null = localStorage.getItem('propuestaId');
  accessToken: string | null = localStorage.getItem('access_token');
  idSesion: string | null = localStorage.getItem('idSesion');
  userId: string | null = localStorage.getItem('userId');
  accesoVoto: boolean = true;  
  todasLasActividades: string[] = [];
  todoLosVotos: any[] = [];
  
  votos: Votos[] = [];

  //activities!: Observable<any[]>;
  constructor(private activityService: ActivitiyService, private socket : SocketService, private partida: PartidaService) {

    this.socket.escucharInicioActividad(); 
    this.socket.escucharFinActividades();
    
  
    this.socket.actividadActual$.subscribe((actividad) => {
      if (actividad) {
        this.actividades = [actividad];
        this.todasLasActividades.push(actividad.title);
        let partidaActual: Partida = {
          idSesion: this.idSesion!== null ? this.idSesion : '',
          idPropuesta: this.propuestaId !== null ? this.propuestaId : '', // Asigna '' si propuestaId es null
          fechaDeJuego: new Date(),
          actividad: actividad.title,
          votos: [],
        }

        let nuevaActividad: Votos = {
          actividad: actividad.title,
          votos: {}
        };

        this.votos.push(nuevaActividad);
        
        this.partida.postPartida(this.accessToken || '', partidaActual).subscribe({
          next: (response) => {
            console.log("Respuesta:", response);            
          },
          error: (error) => {
            console.log("Error:", error);
            console.log("Error completo:", error.error);
          }
        });
        console.log(partidaActual);
      }
    });


    this.socket.finActividad$.subscribe(() => {
      //console.log(this.votos);
      this.addVotos();
      
      this.countVotos(this.todasLasActividades);
      this.accesoVoto = false;
    });

  }


  ngOnDestroy():void{
    this.actividadesSubscription?.unsubscribe();
  }


  // votar(voto: number, actividad: string) {    
  //   if (this.idSesion !== null && this.accessToken !== null) {
  //     this.partida.addVoto(this.accessToken, voto, this.idSesion, actividad);      
  //   }
  // }

  contieneSecuenciaEspecifica(secuencia: string): boolean {
    const currentUrl: string = window.location.href;
    return currentUrl.includes(secuencia);
  }

  
  
  votar(voto: number, actividad: string) {
    if (this.idSesion !== null && this.accessToken !== null && actividad != '') {
      const id = this.userId || '';
      let objetoActividad = this.votos.find((item) => item.actividad === actividad);

         if (!objetoActividad) {
         objetoActividad = {
           actividad: actividad,
           votos: {}
         };
         this.votos.push(objetoActividad);
       }

        if (!objetoActividad.votos[id]) {
          objetoActividad.votos[id] = voto;
        } else {
          // Si el usuario ya había votado previamente para esta actividad, actualiza el voto, es decir, nos quedamos con el último voto del usuario
          objetoActividad.votos[id] += voto;
        }
      
    }
  }

private addVotos(){
  if (this.idSesion !== null && this.accessToken !== null && this.userId !== null && this.votos.length !== 0) {
    this.partida.addVoto(this.votos, this.accessToken, this.idSesion, this.userId);
  }
}

//nuevo
 private countVotos(nombreActividades: string[]) {
   if (this.idSesion !== null && this.accessToken !== null && this.userId !== null ) {
     this.partida.countVotes(this.accessToken, this.idSesion, nombreActividades).subscribe(
      response => {
        console.log("respuestAAAa ", response[0].p);
        this.actividadGanadora = response[0].p;
        this.cantidadVotos = response[0].sum;
      //alert(`Actividad ganadora: ${response[0].p} \nCantidad de votos: ${response[0].sum}`);

      },
      error => {
        console.log(error);               
      }
     )
   }
   
 }
//nuevo

}