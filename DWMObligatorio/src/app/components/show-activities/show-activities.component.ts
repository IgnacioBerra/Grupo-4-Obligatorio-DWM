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
  actividadesSubscription: Subscription | undefined;
  
  //activities!: Observable<any[]>;
  constructor(private activityService: ActivitiyService, private socket : SocketService) {

    //para mostrar tarjetas en html (debe ir en otro componente)
    this.socket.actividadActual$.subscribe((actividad) => {
      if (actividad) {
        this.actividades = [actividad];
        
       
      }
    });

    this.socket.escucharInicioActividad(); //modificar este metodo para que devuelva la lista de actividades
  }

  ngOnInit() {
    const accessToken = localStorage.getItem('access_token');
  }

  ngOnDestroy():void{
    this.actividadesSubscription?.unsubscribe();
  }



  
}
