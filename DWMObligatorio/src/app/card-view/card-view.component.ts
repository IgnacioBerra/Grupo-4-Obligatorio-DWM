import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Propuesta } from '../propuesta';
import { PropuestaService } from '../propuesta.service';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css'],
})

export class CardViewComponent implements OnInit {
  tarjetas!: Observable<any[]>;

  constructor(private propuestaService: PropuestaService) {}

  ngOnInit() {
    this.tarjetas = this.propuestaService.getPropuestas();
  }

}
