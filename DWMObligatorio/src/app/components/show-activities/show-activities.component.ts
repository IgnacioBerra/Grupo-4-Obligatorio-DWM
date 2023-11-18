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

  
  votar(voto: string, actividad: Activity){

    let data = {
      idSesion:'',
      idPropuesta:localStorage.getItem('propuestaId'),
      fechaDeJuego: new Date(),
      actividad: actividad.title,
      voto: actividad.title + voto,
    };
    try {
      await this.fetchPost(data);
    }
    catch (error) {
      console.error(error);
    }

  }

  async fetchPut(UserCredentials: userCredentials) {

    try {
      const post = await fetch("http://localhost:3000/game", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      });
      const response = await post.json();

      console.log(response)
      if (response.valido == true) {
      
      } else {

        console.log("NO ACCEDISTE FINALMENTE.")

        this.router.navigate(['/']);
      }
    }
    catch (error) {
      console.error(error)
    }
  }
  
  
}