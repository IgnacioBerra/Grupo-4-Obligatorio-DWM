import { Component, OnInit } from '@angular/core';
import { PropuestaService } from '../../services/propuesta.service';
import { Propuesta } from "../../interfaces/propuesta";
import { ActivitiyService } from "../../services/activitiy.service";
import { Activity } from "../../interfaces/activity";
import { Router } from '@angular/router';

@Component({
  selector: 'app-propuesta',
  templateUrl: './propuesta.component.html',
  styleUrls: ['./propuesta.component.css']
})
export class PropuestaComponent {
  propuestas: Propuesta[] = [];
  activities: Activity[] = [];
  newPropuesta: Propuesta = {
    id: 0,
    title: '',
    description: '',
    image: '',
    activities: []
  };
  selectedActivities: Activity[] = [];

  constructor(private propuestaService: PropuestaService, private activityService: ActivitiyService, private router:Router) { }

  ngOnInit(): void {
    this.getPropuestas();
    this.getActivities();
  }

  getActivities(): void {
    this.activityService.getActivity(localStorage.getItem('access_token') || 'null').subscribe(x => this.activities = x);
  }

  getPropuestas(): void {
    this.propuestaService.getPropuestas(localStorage.getItem('access_token') || 'null').subscribe(x => this.propuestas = x);
    console.log(this.propuestas);
  }

  prueba(): void {
    console.log(this.selectedActivities);
  }

  estadoActividad(actividad: Activity) {
    const index = this.selectedActivities.indexOf(actividad);
    if (index !== -1) {
      this.selectedActivities.splice(index, 1);
    } else {
      this.selectedActivities.push(actividad);
    }
  }

  //funcion para el formulario 
  onSubmit(): void {
    this.newPropuesta.activities = this.selectedActivities;
    this.propuestaService.addPropuesta(localStorage.getItem('access_token') || 'null', this.newPropuesta).subscribe((data) => {
      console.log('Nueva propuesta creada:', data);
      this.getPropuestas();
      this.router.navigate(['/indexAdmin'])
    });
  }


  modifyPropuesta(updatedPropuesta: Propuesta): void {
    this.propuestaService.modificarPropuesta(localStorage.getItem('access_token') || 'null', updatedPropuesta).subscribe((data) => {
      console.log('Propuesta actualizada:', data);
    });
  }

   deletePropuesta(id: string): void {
    this.propuestaService.eliminarPropuesta(localStorage.getItem('access_token') || 'null', id).subscribe(() => {
      console.log('Propuesta eliminada');
    });
  }
}
