import { Component, OnInit } from '@angular/core';
import { PropuestaService } from '../propuesta.service';
import { Propuesta } from "../propuesta";
import {io}  from 'socket.io-client';


@Component({
  selector: 'app-propuesta',
  templateUrl: './propuesta.component.html',
  styleUrls: ['./propuesta.component.css']
})
export class PropuestaComponent {
  propuestas: Propuesta[] = [];

  newPropuesta: Propuesta = {
    id: 0,
    title: '',
    description: '',
    image: '',
    activities: []
  };

  constructor(private propuestaService: PropuestaService, ) { 
    let socket = io('http://localhost:3333');


    socket.on('connect',() =>{
      console.log('You connected with id: ${socket.id}');
    });

   
  }

  ngOnInit(): void {
    this.getPropuestas();
  }

  

  

  

  

  getPropuestas(): void {
    this.propuestaService.getPropuestas(localStorage.getItem('access_token')||'null').subscribe(x => this.propuestas = x);
    console.log(this.propuestas);
  }

//funcion para el formulario 
  onSubmit(): void {
    this.propuestaService.addPropuesta(localStorage.getItem('access_token')||'null', this.newPropuesta).subscribe((data) => {
      console.log('Nueva propuesta creada:', data);
      this.getPropuestas();
    });
  }
  
//funcion por si sola
  addPropuesta(newPropuesta: Propuesta): void {
    this.propuestaService.addPropuesta(localStorage.getItem('access_token')||'null', newPropuesta).subscribe((data) => {
      console.log('Nueva propuesta creada:', data);
    });
  }

  modifyPropuesta(updatedPropuesta: Propuesta): void {
    this.propuestaService.modificarPropuesta(localStorage.getItem('access_token')||'null', updatedPropuesta).subscribe((data) => {
      console.log('Propuesta actualizada:', data);
    });
  }

  deletePropuesta(id: string): void {
    this.propuestaService.eliminarPropuesta(localStorage.getItem('access_token')||'null', id).subscribe(() => {
      console.log('Propuesta eliminada');
    });
  }

  public socket = io('http://localhost:3333');
}
