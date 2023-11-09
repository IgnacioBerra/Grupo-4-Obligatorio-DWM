import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { environment } from 'src/environment/environment';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app-sala-espera',
  templateUrl: './sala-espera.component.html',
  styleUrls: ['./sala-espera.component.css']
})
export class SalaEsperaComponent {

  imageUrl: string = '';
  usuarios: number = 0;

  constructor(private AuthService: AuthServiceService, private socket: SocketService) {

    this.socket.userCount$.subscribe(count => {
      this.usuarios = count;
      console.log(this.usuarios);
    });
  }

  ngOnInit() {
    console.log(environment.url);
      this.AuthService.getQrFilePath().subscribe((img: Blob) => {
        this.imageUrl = URL.createObjectURL(img);        
    }); 
    }

    
}
