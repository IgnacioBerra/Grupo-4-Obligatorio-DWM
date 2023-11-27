import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.css']
})
export class AddActivityComponent {

  constructor(private http: HttpClient) { }
  actividadPreview = {
    title: 'Titulo',
    description: 'Descripción de la actividad',
    image: ''
  };

  onInputChange(event: any, field: string) {
    if (field === 'title') {
      this.actividadPreview.title = event.target.value;
    } else if (field === 'description') {
      this.actividadPreview.description = event.target.value;
    } else if (field === 'image') {
      const fileInput = event.target;
      if (fileInput.files && fileInput.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.actividadPreview.image = e.target.result;
        };
        reader.readAsDataURL(fileInput.files[0]);
      }
    }
  }

  cargar() {
    this.http.post(`http://${environment.url}:3000/activities`, this.actividadPreview)
      .subscribe(response => {
        console.log('Formulario enviado con éxito:', response);
      }, error => {
        console.error('Error al enviar el formulario:', error);
      });
  }

}
