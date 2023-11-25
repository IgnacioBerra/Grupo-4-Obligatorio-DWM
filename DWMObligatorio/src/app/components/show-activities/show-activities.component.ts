import { Component } from '@angular/core';
import { ActivitiyService } from '../../services/activitiy.service';
import { Observable, Subscription } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';
import { Activity } from 'src/app/interfaces/activity';
import { Partida } from 'src/app/interfaces/partida';
import { PartidaService } from 'src/app/services/partida.service';

@Component({
  selector: 'app-show-activities',
  templateUrl: './show-activities.component.html',
  styleUrls: ['./show-activities.component.css']
})
export class ShowActivitiesComponent {

  actividades: Activity[] = [];
  actividadesSubscription: Subscription | undefined;
  propuestaId: string | null = localStorage.getItem('propuestaId');
  accessToken: string | null = localStorage.getItem('access_token');
  idSesion: string | null = localStorage.getItem('idSesion');
  accesoVoto: boolean = false;

  //activities!: Observable<any[]>;
  constructor(private activityService: ActivitiyService, private socket : SocketService, private partida: PartidaService) {

    //para mostrar tarjetas en html (debe ir en otro componente)
    this.socket.actividadActual$.subscribe((actividad) => {
      if (actividad) {
        this.accesoVoto = true;
        this.actividades = [actividad];

        let partidaActual: Partida = {
          idSesion: this.idSesion!== null ? this.idSesion : '',
          idPropuesta: this.propuestaId !== null ? this.propuestaId : '', // Asigna '' si propuestaId es null
          fechaDeJuego: new Date(),
          actividad: actividad.title,
          votos: [],
        }
        this.partida.postPartida(this.accessToken || '', partidaActual).subscribe({
          next: (response) => {
            console.log("Respuesta:", response);
            // Realiza acciones con la respuesta aquí
          },
          error: (error) => {
            console.log("Error:", error);
            console.log("Error completo:", error.error);
            // Maneja el error aquí
          }
        });
        console.log(partidaActual);
      }
    });

    this.socket.escucharInicioActividad(); //modificar este metodo para que devuelva la lista de actividades
  }


  ngOnDestroy():void{
    this.actividadesSubscription?.unsubscribe();
  }


   votar(voto: number, actividad: string) {    
    if (this.idSesion !== null && this.accessToken !== null) {
      this.partida.addVoto(this.accessToken, voto, this.idSesion, actividad);      
    }
   }

  
}