import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from 'express';
import { io } from 'socket.io-client';
import { IOType } from 'child_process';

@Component({
  selector: 'app-sala-espera',
  templateUrl: './sala-espera.component.html',
  styleUrls: ['./sala-espera.component.css']
})
export class SalaEsperaComponent {
  // // qrUrl: string = '';

  // // constructor(private authService: AuthServiceService) {}

  // // ngOnInit() {
  // //   this.obtenerQR();   
  // // }

  // // obtenerQR() {
  // //   this.authService.obtenerQRUrl().subscribe((url: string) => {
  // //     console.log(url);
  // //     this.qrUrl = url;   
  // //   });
  // // }
  qrUrl: string = '';

  public socket;

  constructor(private AuthService: AuthServiceService) {
    this.socket = io('http://localhost:3333')
  }

  ngOnInit() {
    this.AuthService.getQrFilePath().subscribe((url: string) => {
      this.qrUrl = url;
      console.log(this.qrUrl);
    });

    this.socket.on('connect', () => {
      console.log(`You connected with id: ${this.socket.id}`);
    });



    //recibo propuesta del server 
    this.socket.on('custom-event', propuesta => {
      this.socket.emit("pass", propuesta)
    })

    this.socket.on('iniciarActividad', (actividadId) => {
      // LOGICA IR MOSTRANDO LAS ACTIVIDADES
      

    });
  }

  /*iniciarPropuesta(propuestaId: any) {
    this.socket.emit('iniciamo', propuestaId);
  }*/

  readID(){
    // LEO DEL LOCALSTORAGE CUAL ES LA ACTIVIDAD QUE SE HABIA SELECCIONADO PREVIAMENTE PARA DESPUES JUGARLA.
    const activityID = localStorage.getItem('propuestaId');
    if(activityID != null)
    {
      this.iniciarJuego(activityID);
    }
    
  }

  public iniciarJuego(propuestaId:string){
      
      this.socket.emit("iniciarJuego", propuestaId);
    
  }
}
