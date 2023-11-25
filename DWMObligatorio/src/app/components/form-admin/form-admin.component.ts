import { Component, ElementRef, ViewChild, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { userCredentials } from '../../user';
import { Router } from '@angular/router';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-form-admin',
  templateUrl: './form-admin.component.html',
  styleUrls: ['./form-admin.component.css']
})
export class FormAdminComponent {

  token="";
  constructor(private router: Router) {

  }

  username = "";
  password = "";

  async logeo() {

    if (this.username == null || this.password == null) {
      if (!this.username || !this.password) {
        return;
      }
    }

    let credentials: userCredentials = {
      User: this.username,
      PassWord: this.password
    };
    try {
      await this.fetchPost(credentials);
      this.username = "";
      this.password = "";
    }
    catch (error) {
      console.error(error);
    }
  }
  


  async fetchPost(UserCredentials: userCredentials) {

    try {
      const post = await fetch(`http://${environment.url}:3000/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(UserCredentials),
      });
      const response = await post.json();

      console.log(response)
      if (response.valido == true) {
        console.log(response.accessToken)
        localStorage.setItem('access_token',response.accessToken);
        console.log(" ACCEDISTE FINALMENTE.");
        console.log("Como es posible este suceso");
        this.router.navigate(['/indexAdmin']);
      } else {


        console.log("NO ACCEDISTE FINALMENTE.")

        this.router.navigate(['/']);
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  

}

