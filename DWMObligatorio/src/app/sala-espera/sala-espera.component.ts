import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from 'express';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-sala-espera',
  templateUrl: './sala-espera.component.html',
  styleUrls: ['./sala-espera.component.css']
})
export class SalaEsperaComponent {

  imageUrl: string = '';
  constructor(private AuthService: AuthServiceService) {}

  ngOnInit() {
    console.log(environment.url);
      this.AuthService.getQrFilePath().subscribe((img: Blob) => {
        this.imageUrl = URL.createObjectURL(img);        
    });
    }
}
