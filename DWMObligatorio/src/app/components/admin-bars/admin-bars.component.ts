import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-admin-bars',
  templateUrl: './admin-bars.component.html',
  styleUrls: ['./admin-bars.component.css']
})
export class AdminBarsComponent {

  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver, private router: Router) {}

  ngAfterViewInit() {
    this.observer.observe(["(max-width: 800px)"]).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = "over";
        this.sidenav.close();
      } else {
        this.sidenav.mode = "side";
        this.sidenav.open();
      }
    });
  }

  async logout() {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      try {
        await fetch('http://localhost:3000/login/logout', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`, 
          },
        });
        localStorage.removeItem('access_token'); 
        console.log('Sesión cerrada con éxito');
        this.router.navigate(['/login']);
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
    }
  }

}
