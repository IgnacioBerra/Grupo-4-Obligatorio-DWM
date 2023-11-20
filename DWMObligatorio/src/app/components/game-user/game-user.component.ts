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
    // this.userId = uuidv4();
    // this.socket.increaseUserCount(this.userId); //incrementando cada vez q se conecta un user  
  }

  //PROBAR DESDE DIFERENTES DISPOSITIVOS, SI NO NO SE SI FUNCIONA COMO DEBE

  ngOnInit(): void {
    // Verificar si existe un ID almacenado localmente
    const storedUserId = localStorage.getItem('userId');

    // Generar un nuevo ID si no existe o no es válido
    if (!storedUserId || !this.isValidUUID(storedUserId)) {
      this.userId = uuidv4();
      localStorage.setItem('userId', this.userId); // Guardar el nuevo ID en el almacenamiento local
    } else {
      this.userId = storedUserId; // Usar el ID almacenado localmente
    }

    this.socket.increaseUserCount(this.userId); // Incrementar cada vez que se conecta un usuario
  }

  // ESTO es para verificar si un string es un UUID válido
  isValidUUID(uuid: string): boolean {
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidRegex.test(uuid);
  }

}
