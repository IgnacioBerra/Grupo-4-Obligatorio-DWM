import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { environment } from 'src/environment/environment';
import { SocketService } from '../../services/socket.service';
//para mostrar tarjetas en html (debe ir en otro componente)
import { Activity } from 'src/app/interfaces/activity';
import { Subscription } from 'rxjs';
//para mostrar tarjetas en html (debe ir en otro componente)

@Component({
  selector: 'app-sala-espera',
  templateUrl: './sala-espera.component.html',
  styleUrls: ['./sala-espera.component.css']
})
export class SalaEsperaComponent implements OnInit {

   imageUrl: string = '';
   usuarios: number = 0;
   comienzo: boolean = false;

  //para mostrar tarjetas en html (debe ir en otro componente)
  // actividades: Activity[] = [];
  // selectedOptions: { [activityId: string]: string } = {};
  // actividadesSubscription: Subscription | undefined;
  // selectedFeedback: string | null = null;
  //para mostrar tarjetas en html (debe ir en otro componente)

  constructor(private AuthService: AuthServiceService, private socket: SocketService) {

    // //para mostrar tarjetas en html (debe ir en otro componente)
    // this.socket.actividadActual$.subscribe((actividad) => {
    //   if (actividad) {
    //     this.actividades = [actividad];
    //     this.resetFeedbackSelection(); // Reinicia la selección de radio button
    //   }
    // });
    //para mostrar tarjetas en html (debe ir en otro componente)

    this.socket.userCount$.subscribe(count => {
      this.usuarios = count;
      console.log(this.usuarios);
    });

    // this.socket.escucharInicioActividad();

  }

  ngOnInit() {
    console.log(environment.url);
    this.AuthService.getQrFilePath().subscribe((img: Blob) => {
      this.imageUrl = URL.createObjectURL(img);
      this.socket.retrieveStoredUserCount(); // Recupera el valor almacenado en localStorage       
    });
  }

  // //para mostrar tarjetas en html (debe ir en otro componente)
  // ngOnDestroy(): void {
  //   // Desuscribirse para evitar pérdida de memoria
  //   this.actividadesSubscription?.unsubscribe();
  // }
  // //para mostrar tarjetas en html (debe ir en otro componente)

   readID() {
     // LEO DEL LOCALSTORAGE CUAL ES LA ACTIVIDAD QUE SE HABIA SELECCIONADO PREVIAMENTE PARA DESPUES JUGARLA.
     const activityID = localStorage.getItem('propuestaId');
     if (activityID != null) {
       console.log(activityID);
       this.socket.iniciarJuego(activityID);
       this.comienzo = true;
     }
   }

  // //para mostrar tarjetas en html (debe ir en otro componente)
  // handleFeedback(feedbackType: string): void {
  //   console.log(`Feedback: ${feedbackType}`);
  //   // Realiza acciones adicionales según el tipo de feedback seleccionado

  //   // Guarda el estado de selección
  //   this.selectedFeedback = feedbackType;
  // }

  // // Método para reiniciar la selección
  // resetFeedbackSelection(): void {
  //   this.selectedFeedback = null;
  // }
  //para mostrar tarjetas en html (debe ir en otro componente)
  
}

    

    

