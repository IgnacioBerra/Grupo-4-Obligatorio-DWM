import { Component, OnInit } from '@angular/core';
import { Activity } from "../../interfaces/activity";
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActivitiyService } from "../../services/activitiy.service";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-display-activities',
  templateUrl: './display-activities.component.html',
  styleUrls: ['./display-activities.component.css']
})

export class DisplayActivitiesComponent implements OnInit {
  actividades!: Observable<any[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activityService: ActivitiyService, private location: Location
  ) { }

  ngOnInit(): void {
    this.getActividades();
  }

  getActividades(): void {
    this.actividades = this.activityService.getActivity(localStorage.getItem('access_token') || 'null');
  }
  editarActividad(id: number): void {
    this.router.navigate(['/editar-activities', id]);
  }

  eliminarActividad(actividadId: string) {
    this.activityService.eliminarActivity(localStorage.getItem('access_token') || 'null', actividadId).subscribe(() => {
      console.log('Propuesta eliminada');
      location.reload();
    });
  }
  goBack(): void {
    this.location.back();
  }
}
