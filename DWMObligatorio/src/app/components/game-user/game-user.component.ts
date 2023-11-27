import { Component } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { v4 as uuidv4 } from 'uuid';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-game-user',
  templateUrl: './game-user.component.html',
  styleUrls: ['./game-user.component.css']
})
export class GameUserComponent {

  userId: string = '';
  paramSession: string | null ='';
  acceso: boolean = false;
  storedSessionId: string | null = null;
  storedUserId: string | null = null;

  constructor(private socket: SocketService, private route: ActivatedRoute) {
    // this.userId = uuidv4();
    // this.socket.increaseUserCount(this.userId); //incrementando cada vez q se conecta un user 
     this.paramSession = this.route.snapshot.paramMap.get('sessionId') ;
     this.storedSessionId = localStorage.getItem('idSesion');
     this.storedUserId = localStorage.getItem('userId');

    if(this.storedSessionId != this.paramSession){
      this.acceso = false;
    }else{
      this.acceso = true;
    }

    this.verificaUID();
  }

  //PROBAR DESDE DIFERENTES DISPOSITIVOS, SI NO NO SE SI FUNCIONA COMO DEBE

  verificaUID(): void { 
    
    // Generar un nuevo ID si no existe o no es válido
    if (!this.storedUserId) {
      this.userId = uuidv4();      
      localStorage.setItem('userId', this.userId); 
    } else{
      this.userId = this.storedUserId; 
    }
    this.socket.increaseUserCount(this.userId); 
  }
}
