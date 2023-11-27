import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PropuestaService } from '../../services/propuesta.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css'],
})

export class CardViewComponent implements OnInit {
  tarjetas!: Observable<any[]>;

  constructor(private propuestaService: PropuestaService, private router: Router) { }

  ngOnInit() {
    const accessToken = localStorage.getItem('access_token');
    this.tarjetas = this.propuestaService.getPropuestas(accessToken || 'null');
  }

  guardarId(actividadId: string) {
    localStorage.setItem('propuestaId', actividadId);
    this.router.navigate(['/game']);

  }

  removeId(actividadId: string) {
    this.propuestaService.eliminarPropuesta(localStorage.getItem('access_token') || 'null', actividadId).subscribe(() => {
      console.log('Propuesta eliminada');
      location.reload();
    });

  }

  editarPropuesta(id: number): void {
    this.router.navigate(['/editar-propuesta', id]);
  }
}
