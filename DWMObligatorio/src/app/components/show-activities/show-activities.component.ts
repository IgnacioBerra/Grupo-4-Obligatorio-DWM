import { Component } from '@angular/core';
import { ActivitiyService } from '../../services/activitiy.service';
import { Observable, Subscription } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';
import { Activity } from 'src/app/interfaces/activity';
import { Partida } from 'src/app/interfaces/partida';
import { PartidaService } from 'src/app/services/partida.service';
import { Votos } from 'src/app/interfaces/votos';
import { Router, NavigationExtras } from '@angular/router';



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
  idSesion: string | null = localStorage.getItem('idSesion');
  userId: string | null = localStorage.getItem('userId');
  accesoVoto: boolean = true;  
  todasLasActividades: string[] = [];
  todoLosVotos: any[] = [];
  partidas: Partida[] = [];
  votos: Votos[] = [];
  cantidad: number = 100000000;
  ok: number = 1;
  partidaActuale: Partida = {
    idSesion: '',
    idPropuesta: '', 
    fechaDeJuego: new Date(),
    actividad: '',
    votos: [],
  }
  public actividadActual: Activity | null = null;

  //activities!: Observable<any[]>;
  constructor(private socket : SocketService, private partida: PartidaService, private router: Router) {

    this.socket.escucharInicioActividad(); 
    this.socket.escucharFinActividades();
    
  
    this.socket.finActividad$.subscribe(() => {
      //console.log(this.votos);
      const agrego = this.addVotos();
      if(agrego){
         this.countVotos(this.todasLasActividades);
      }
    });

  }
  ngOnInit() {

    this.actividadesSubscription = this.socket.actividadActual$.subscribe((actividad) => {
      if (actividad) {
        this.actividades = [actividad];
        this.todasLasActividades.push(actividad.title);

        let partidaActual: Partida = {
          idSesion: this.idSesion!== null ? this.idSesion : '',
          idPropuesta: this.propuestaId !== null ? this.propuestaId : '', 
          fechaDeJuego: new Date(),
          actividad: actividad.title,
          votos: [],
        }
        this.partidas.push(partidaActual);
          let nuevaActividad: Votos = {
            actividad: actividad.title,
            votos: {}
          };

         this.votos.push(nuevaActividad);
        
        
        console.log("PARTIDAS:::::::::::::: ",this.partidas)
        this.partida.postPartida(partidaActual).subscribe({
          next: (response) => {
            console.log("Respuesta:", response);   
            console.log("PARTIDA AGREGADA POR CADA ACTIVIDAD: ", partidaActual)         
          },
          error: (error) => {
            console.log("Error:", error);
            console.log("Error completo:", error.error);
          }
        });        
      }
    });
  }

  ngOnDestroy():void{
    this.actividadesSubscription?.unsubscribe();
  }

  contieneSecuenciaEspecifica(secuencia: string): boolean {
    const currentUrl: string = window.location.href;
    return currentUrl.includes(secuencia);
  }

  
  
  votar(voto: number, actividad: string) {
    console.log("USER ID", this.userId);
    console.log("voto: ", voto)
    
    if (this.idSesion !== null && actividad != '') {
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
        console.log("EL VOTO GUARDADO: ", objetoActividad);
    }
  }

private addVotos() : boolean{
  if (this.idSesion !== null && this.userId !== null && this.votos.length !== 0) {
     this.partida.addVoto(this.votos,this.idSesion, this.userId);
    return true;
  }
  return false;
}

//nuevo
 private countVotos(nombreActividades: string[]) {
  console.log("NOMBRE ACTIVDIDADES: ", nombreActividades)
   if (this.idSesion !== null && this.userId !== null ) {
     this.partida.countVotes(this.idSesion, nombreActividades).subscribe(
      response => {
      
        console.log("VOTOS: ", response[0].sum)
        console.log("ACTIVIDAD: ", response[0].p)

         const navigationExtras: NavigationExtras = {
          state: {
            score: response[0].sum,
            actividad: response[0].p
          }
        };
         this.router.navigate(['/ranking'], navigationExtras)
      
        
        
      },
      error => {
        console.log(error);           
        return null;    
      }
     )
   }
   
 }

}