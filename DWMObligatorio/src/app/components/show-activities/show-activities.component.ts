import { Component } from '@angular/core';
import { ActivitiyService } from '../../services/activitiy.service';
import { Observable, Subscription } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';
import { Activity } from 'src/app/interfaces/activity';

@Component({
  selector: 'app-show-activities',
  templateUrl: './show-activities.component.html',
  styleUrls: ['./show-activities.component.css']
})
export class ShowActivitiesComponent {

  actividades: Activity[] = [];
  selectedOptions: { [activityId: string]: string } = {};
  actividadesSubscription: Subscription | undefined;
  selectedFeedback: string | null = null;
  //activities!: Observable<any[]>;
  constructor(private activityService: ActivitiyService, private socket : SocketService) {

    //para mostrar tarjetas en html (debe ir en otro componente)
    this.socket.actividadActual$.subscribe((actividad) => {
      if (actividad) {
        this.actividades = [actividad];
        
        this.resetFeedbackSelection(); // Reinicia la selección de radio button
      }
    });

    this.socket.escucharInicioActividad(); //modificar este metodo para que devuelva la lista de actividades
  }

  ngOnInit() {
    const accessToken = localStorage.getItem('access_token');
  }

   //para mostrar tarjetas en html (debe ir en otro componente)
   ngOnDestroy(): void {
    // Desuscribirse para evitar pérdida de memoria
    this.actividadesSubscription?.unsubscribe();
  }
  //para mostrar tarjetas en html (debe ir en otro componente)



  //para mostrar tarjetas en html (debe ir en otro componente)
  handleFeedback(feedbackType: string): void {
    console.log(`Feedback: ${feedbackType}`);
    // Realiza acciones adicionales según el tipo de feedback seleccionado

    // Guarda el estado de selección
    this.selectedFeedback = feedbackType;
  }

  // Método para reiniciar la selección
  resetFeedbackSelection(): void {
    this.selectedFeedback = null;
  }

  
}
