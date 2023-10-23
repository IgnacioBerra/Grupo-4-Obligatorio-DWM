import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { userCredentials } from '../user';



@Component({
  selector: 'app-form-admin',
  templateUrl: './form-admin.component.html',
  styleUrls: ['./form-admin.component.css']
})
export class FormAdminComponent {
  username = "";
  password = "";



  sendCredentials() {

    if (this.username == null || this.password == null) {
      if (!this.username || !this.password) {
        return;
      }
    }

    let credentials: userCredentials = {
      User: this.username,
      PassWord: this.password
    };

    this.fetchPost(credentials);

    this.username ="";
    this.password ="";
  }


  async fetchPost(UserCredentials: userCredentials) {
    try {
      const post = await fetch("http://localhost:3000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(UserCredentials),
      });
      let result = await post.json();
    }
    catch (error) {
      console.error("Error")
    }
  }

}

