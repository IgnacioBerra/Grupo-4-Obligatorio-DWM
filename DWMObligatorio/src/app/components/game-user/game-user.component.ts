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
  acceso: boolean = true;
  storedSessionId: string | null = null;
  storedUserId: string | null = null;
  propuestaId: string | null = null;

  constructor(private socket: SocketService, private route: ActivatedRoute) {
    // this.userId = uuidv4();
    // this.socket.increaseUserCount(this.userId); //incrementando cada vez q se conecta un user 
    
  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.paramSession = params['sessionId'];   
      this.propuestaId = params['propuestaId'];
      if(this.paramSession){    
        localStorage.setItem('idSesion', this.paramSession);    
      }
      if(this.propuestaId){
        localStorage.setItem('propuestaId', this.propuestaId);
      }
    });

     //this.storedSessionId = localStorage.getItem('idSesion');


    if(this.paramSession !== ''){
      this.acceso = true;          
    }else{
      this.acceso = false;
    }

    this.verificaUID();
    console.log("ESTE ES MI USERID: ",this.userId);
  }

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
