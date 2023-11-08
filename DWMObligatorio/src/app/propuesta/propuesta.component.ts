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

    function iniciarPropuesta(propuestaId:any){
      socket.emit('iniciamo',propuestaId);
    }

    //recibo propuesta del server 
    socket.on('custom-event', propuesta=>{

        socket.emit("pass",propuesta)
    })
  }

  ngOnInit(): void {
    this.getPropuestas();
  }

  

  

  getPropuestas(): void {
    this.propuestaService.getPropuestas().subscribe(x => this.propuestas = x);
    console.log(this.propuestas);
  }

//funcion para el formulario 
  onSubmit(): void {
    this.propuestaService.addPropuesta(this.newPropuesta).subscribe((data) => {
      console.log('Nueva propuesta creada:', data);
      this.getPropuestas();
    });
  }
  
//funcion por si sola
  addPropuesta(newPropuesta: Propuesta): void {
    this.propuestaService.addPropuesta(newPropuesta).subscribe((data) => {
      console.log('Nueva propuesta creada:', data);
    });
  }

  modifyPropuesta(updatedPropuesta: Propuesta): void {
    this.propuestaService.modificarPropuesta(updatedPropuesta).subscribe((data) => {
      console.log('Propuesta actualizada:', data);
    });
  }

  deletePropuesta(id: string): void {
    this.propuestaService.eliminarPropuesta(id).subscribe(() => {
      console.log('Propuesta eliminada');
    });
  }

  public socket = io('http://localhost:3333');
}
