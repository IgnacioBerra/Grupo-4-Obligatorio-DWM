import { Component } from '@angular/core';
import { SocketService } from '../../services/socket.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-game-user',
  templateUrl: './game-user.component.html',
  styleUrls: ['./game-user.component.css']
})
export class GameUserComponent {

  userId: string = '';
  
  constructor(private socket: SocketService) {
    this.userId = uuidv4();
    this.socket.increaseUserCount(this.userId); //incrementando cada vez q se conecta un user  
  }

  ngOnInit(): void {    
    
  }

}
