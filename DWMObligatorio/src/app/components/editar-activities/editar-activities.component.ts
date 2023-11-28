import { Component, OnInit } from '@angular/core';
import { Activity } from "../../interfaces/activity";
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ActivitiyService } from "../../services/activitiy.service";

@Component({
  selector: 'app-editar-activities',
  templateUrl: './editar-activities.component.html',
  styleUrls: ['./editar-activities.component.css']
})
export class EditarActivitiesComponent implements OnInit {
  actividad: Activity = {
    id: 0,
    title: '',
    description: '',
    image: ''
  };

  constructor(
    private route: ActivatedRoute,
    private activityService: ActivitiyService, private location: Location
  ) { }

  ngOnInit(): void {
    this.getActividad();
  }

  getActividad(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.activityService.getActivityByID(localStorage.getItem('access_token') || 'null', id).subscribe(x => {
      this.actividad = x;
      console.log(this.actividad);
    },
      (error) => {
        console.error('Error en encontrar la propuesta:', error);
      });
  }

  guardarCambios(): void {
    console.log(this.actividad);
    this.activityService.modificarActivity(localStorage.getItem('access_token') || 'null', this.actividad).subscribe((data) => {
      console.log('Propuesta actualizada:', data);
    },
      (error) => {
        console.error('Error al actualizar la propuesta:', error);
      });
    this.goBack();
  }

  deleteActividad(id: string): void {
    this.activityService.eliminarActivity(localStorage.getItem('access_token') || 'null', id).subscribe(() => {
      console.log('Propuesta eliminada');
    });
  }

  onInputChange(event: any, field: string) {
    if (field === 'image') {
      const fileInput = event.target;
      if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.actividad.image = e.target.result;
        };
        reader.readAsDataURL(fileInput.files[0]);
      }
    }
  }

  goBack(): void {
    this.location.back();
  }
}
