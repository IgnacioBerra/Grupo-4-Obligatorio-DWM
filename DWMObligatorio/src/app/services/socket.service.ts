import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { environment } from 'src/environment/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  
  socket: any;
  private _userCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public userCount$ = this._userCount.asObservable();

   constructor() { 
      //this.socket = io('http://localhost:3333');
      this.socket = io(`http://${environment.url}:3000`);
   
      this.socket.on('user-count', (count: number) => {
        this._userCount.next(count);
      });
   }

  increaseUserCount(): void {
    this._userCount.next(this._userCount.getValue() + 1);
    
  }

  public sendUserId(userId: string): void {
    this.socket.emit('usuario-conectado', userId);
  }

  public sendMessage(message: string): void {
    this.socket.emit('message', message);
  }

}
