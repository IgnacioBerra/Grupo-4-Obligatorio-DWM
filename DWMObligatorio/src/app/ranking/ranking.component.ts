import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent {

  score: string | null='';
  actividad: string | null='';
  constructor(private route: ActivatedRoute) {
    this.route.paramMap.subscribe(params => {
    
      this.score = params.get('score');
      this.actividad = params.get('actividad');
      
      if (this.score && this.actividad) {
        console.log('Puntuación recibida:', this.score);
        console.log('Actividad recibida:', this.actividad);
        // Haz lo que necesites con la puntuación y la actividad recibida
      }
    });
}
}
