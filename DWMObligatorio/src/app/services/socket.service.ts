import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environment/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  
  socket: any;
  private readonly USER_COUNT_KEY = 'userCount';
  private _userCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public userCount$ = this._userCount.asObservable();
  
   constructor() { 
      //this.socket = io('http://localhost:3333');
      this.socket = io(`http://${environment.url}:3000`);
   
      this.socket.on('user-count', (count: number) => {
        this._userCount.next(count);
      });

      this.socket.on('disconnect', () => {
        this.socket.disconnect();
      });

     this.retrieveStoredUserCount();

    }


    public escucharInicioActividad(){
      this.socket.on('iniciarActividad', (actividadId:string) => {
        // LOGICA IR MOSTRANDO LAS ACTIVIDADES
        
  
      });
    }

  increaseUserCount(id: string): void {
    this._userCount.next(this._userCount.getValue() + 1);
    this.sendUser(id);
    
  }

  retrieveStoredUserCount(): void {
  const storedUserCount = localStorage.getItem(this.USER_COUNT_KEY);
  console.log('Stored user count:', storedUserCount); // Verifica si se está recuperando el valor de localStorage
  if (storedUserCount) {
    this._userCount.next(parseInt(storedUserCount, 10));
  }
}

  private sendUser(id: string): void {
    this.socket.emit('usuario-conectado', id);
  }

  public sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

  public iniciarJuego(propuestaId:string){
      
    this.socket.emit("iniciarJuego", propuestaId);
  
}

  public iniciarActividad(actividadId:string)
  {
    this.socket.broadcast.emit("iniciarActividad",actividadId)
  }

}
