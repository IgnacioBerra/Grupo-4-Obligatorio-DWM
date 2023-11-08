import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../auth-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from 'express';

@Component({
  selector: 'app-sala-espera',
  templateUrl: './sala-espera.component.html',
  styleUrls: ['./sala-espera.component.css']
})
export class SalaEsperaComponent {
  // // qrUrl: string = '';

  // // constructor(private authService: AuthServiceService) {}

  // // ngOnInit() {
  // //   this.obtenerQR();   
  // // }

  // // obtenerQR() {
  // //   this.authService.obtenerQRUrl().subscribe((url: string) => {
  // //     console.log(url);
  // //     this.qrUrl = url;   
  // //   });
  // // }
  qrUrl: string = '';

  constructor(private AuthService: AuthServiceService) {}

  ngOnInit() {
      this.AuthService.getQrFilePath().subscribe((url: string) => {
      this.qrUrl = url;
      console.log(this.qrUrl);
    });
    }
}
