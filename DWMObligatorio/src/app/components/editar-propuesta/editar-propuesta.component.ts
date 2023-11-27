import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Propuesta } from 'src/app/interfaces/propuesta';
import { PropuestaService } from 'src/app/services/propuesta.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-editar-propuesta',
  templateUrl: './editar-propuesta.component.html',
  styleUrls: ['./editar-propuesta.component.css']
})
export class EditarPropuestaComponent implements OnInit {
  propuesta: Propuesta = {
    id: 0,
    title: '',
    description: '',
    image: '',
    activities: [],
  };

  constructor(
    private route: ActivatedRoute,
    private propuestaService: PropuestaService, private location: Location
  ) { }

  ngOnInit(): void {
    this.getPropuesta();
  }

  getPropuesta(): void {
    const id = String(this.route.snapshot.paramMap.get('id'));
    this.propuestaService.getPropuesta(localStorage.getItem('access_token') || 'null', id).subscribe(x => {
      this.propuesta = x;
      console.log(this.propuesta);
    },
      (error) => {
        console.error('Error en encontrar la propuesta:', error);
      });

  }

  guardarCambios(): void {
    console.log(this.propuesta);
    this.propuestaService.modificarPropuesta(localStorage.getItem('access_token') || 'null', this.propuesta).subscribe((data) => {
      console.log('Propuesta actualizada:', data);
    },
      (error) => {
        console.error('Error al actualizar la propuesta:', error);
      });

    this.goBack();

  }

  onInputChange(event: any, field: string) {
    if (field === 'image') {
      const fileInput = event.target;
      if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.propuesta.image = e.target.result;
        };
        reader.readAsDataURL(fileInput.files[0]);
      }
    }
  }

  goBack(): void {
    this.location.back();
  }
}
