import { Component, OnInit } from '@angular/core';
import { PropuestaService } from '../propuesta.service';
import { Propuesta } from "../propuesta";
@Component({
  selector: 'app-propuesta',
  templateUrl: './propuesta.component.html',
  styleUrls: ['./propuesta.component.css']
})
export class PropuestaComponent {
  propuestas: Propuesta[] = [];

  constructor(private propuestaService: PropuestaService) { }

  ngOnInit(): void {
    this.getPropuestas();
}
  getPropuestas(): void {
    this.propuestaService.getPropuestas()
      .subscribe(x => this.propuestas = x);
      console.log(this.propuestas);
  }  
}
