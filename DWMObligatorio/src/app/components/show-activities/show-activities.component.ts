import { Component } from '@angular/core';
import { ActivitiyService } from '../../services/activitiy.service';
import { Observable } from 'rxjs';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-show-activities',
  templateUrl: './show-activities.component.html',
  styleUrls: ['./show-activities.component.css']
})
export class ShowActivitiesComponent {

  activities!: Observable<any[]>;
  constructor(private activityService: ActivitiyService, private socket : SocketService) {}

  ngOnInit() {
    const accessToken = localStorage.getItem('access_token');
    //this.activities = this.activityService.getActivity(accessToken || 'null');
    this.socket.escucharInicioActividad(); //modificar este metodo para que devuelva la lista de actividades
  }
  
}
