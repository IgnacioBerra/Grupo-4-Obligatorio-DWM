import { Component } from '@angular/core';
import { SocketService } from '../services/socket.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-game-user',
  templateUrl: './game-user.component.html',
  styleUrls: ['./game-user.component.css']
})
export class GameUserComponent {

  userId: string = '';
  
  constructor(private socket: SocketService) {}

  ngOnInit(): void {
    this.socket.sendMessage('hola');
    this.userId = uuidv4(); // generando un id unico para cada usuario
    this.socket.increaseUserCount(); //incrementando cada vez q se conecta un user
    this.socket.sendUserId(this.userId);
  }

}
