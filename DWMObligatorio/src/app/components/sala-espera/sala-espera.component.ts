import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { environment } from 'src/environment/environment';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-sala-espera',
  templateUrl: './sala-espera.component.html',
  styleUrls: ['./sala-espera.component.css']
})
export class SalaEsperaComponent implements OnInit {

  imageUrl: string = '';
  usuarios: number = 0;
  comienzo: boolean = false;

  constructor(private AuthService: AuthServiceService, private socket: SocketService) {

    this.socket.userCount$.subscribe(count => {
      this.usuarios = count;
      console.log(this.usuarios);
    });

    this.socket.escucharInicioActividad();

  }

  ngOnInit() {
    console.log(environment.url);
    this.AuthService.getQrFilePath().subscribe((img: Blob) => {
      this.imageUrl = URL.createObjectURL(img);
      this.socket.retrieveStoredUserCount(); // Recupera el valor almacenado en localStorage       
    });
  }

  readID() {
    // LEO DEL LOCALSTORAGE CUAL ES LA ACTIVIDAD QUE SE HABIA SELECCIONADO PREVIAMENTE PARA DESPUES JUGARLA.
    const activityID = localStorage.getItem('propuestaId');
    if (activityID != null) {
      console.log(activityID);
      this.socket.iniciarJuego(activityID);
      this.comienzo = true;
    }

  }
  
}

    

    

