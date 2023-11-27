import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Propuesta } from '../../interfaces/propuesta';
import { PropuestaService } from '../../services/propuesta.service';
import { Router } from '@angular/router';
import { getSafePropertyAccessString } from '@angular/compiler';
@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css'],
})

export class CardViewComponent implements OnInit {
  tarjetas!: Observable<any[]>;

  constructor(private propuestaService: PropuestaService,private router: Router) {}

  ngOnInit() {
    const accessToken = localStorage.getItem('access_token');
    this.tarjetas = this.propuestaService.getPropuestas(accessToken || 'null');
  }

  guardarId(propuestaId:string)
  {
    localStorage.setItem('propuestaId', propuestaId);
    this.router.navigate([`/game/${propuestaId}`]);
    
  }

  removeId(actividadId:string)
  {

    this.propuestaService.eliminarPropuesta(localStorage.getItem('access_token') || 'null', actividadId).subscribe(() => {
      console.log('Propuesta eliminada');
    });
    
  }
}
