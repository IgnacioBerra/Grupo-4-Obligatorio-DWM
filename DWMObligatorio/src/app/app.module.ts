import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormAdminComponent } from './form-admin/form-admin.component';
import { PropuestaComponent } from './propuesta/propuesta.component';
import { AtzationInterceptor } from './atzation.interceptor';
import { AuthServiceService } from './auth-service.service';

@NgModule({
  declarations: [
    AppComponent,
    PropuestaComponent,
    FormAdminComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [AuthServiceService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AtzationInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
