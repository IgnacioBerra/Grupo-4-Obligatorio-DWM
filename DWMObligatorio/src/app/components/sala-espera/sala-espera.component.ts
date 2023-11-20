import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { environment } from 'src/environment/environment';
import { SocketService } from '../../services/socket.service';
import { v4 as uuidv4 } from 'uuid';

import { PartidaService } from 'src/app/services/partida.service';


@Component({
  selector: 'app-sala-espera',
  templateUrl: './sala-espera.component.html',
  styleUrls: ['./sala-espera.component.css']
})
export class SalaEsperaComponent implements OnInit {

   imageUrl: string = '';
   usuarios: number = 0;
   comienzo: boolean = false;
   sessionId: string = '';
   url: string = '';


  constructor(private AuthService: AuthServiceService, private socket: SocketService, private partida: PartidaService) {


    this.socket.userCount$.subscribe(count => {
      this.usuarios = count;
      console.log(this.usuarios);
    });

    // this.socket.escucharInicioActividad();

  }

  ngOnInit() {
    console.log(environment.url);
    this.sessionId = uuidv4(); //creo el id de 
    console.log("sesion id: ", this.sessionId);
    localStorage.setItem('idSesion', this.sessionId);
      //this.AuthService.getQrFilePath(this.sessionId).subscribe((img: Blob) => {
        const accessToken = localStorage.getItem('access_token');
        this.AuthService.getQrFilePath(accessToken || 'null', this.sessionId).subscribe((response: any) => {
          this.url = response.qrCodeUrl; // esta es la url del QR
          const qrCodeBufferBase64: string = response.qrCodeBuffer; 
        
          // convirtiendo el buffer del QR de base64(que asi lo envio desde el server) a Blob, para poder crear el objeto, fue la unica manera de poder acceder a la imagen
          const byteCaracteres = atob(qrCodeBufferBase64); //esta funcion decodifica una cadena de datos base64
          const byteNumeros = new Array(byteCaracteres.length);
          for (let i = 0; i < byteCaracteres.length; i++) {
            byteNumeros[i] = byteCaracteres.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumeros);
          const byteBlob = new Blob([byteArray], { type: 'image/png' });
        
          
        this.imageUrl = URL.createObjectURL(byteBlob);
        this.socket.retrieveStoredUserCount(); // Recupera el valor almacenado en localStorage       
    });
  }


   readID() {
     // LEO DEL LOCALSTORAGE CUAL ES LA PROPUESTA QUE SE HABIA SELECCIONADO PREVIAMENTE PARA DESPUES JUGARLA.
     const propuestaId = localStorage.getItem('propuestaId');
     if (propuestaId != null) {
       console.log(propuestaId);
      //  this.fetchPost(propuestaId);   
      const accessToken = localStorage.getItem('access_token');   
      this.partida.postStart(accessToken || 'null', propuestaId);
      this.comienzo = true;
     }
   }


}

    

    

