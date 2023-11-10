import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormAdminComponent } from './components/form-admin/form-admin.component';
import { PropuestaComponent } from './components/propuesta/propuesta.component';
import { AtzationInterceptor } from './atzation.interceptor';
import { AuthServiceService } from './services/auth-service.service';
import { AdminBarsComponent } from './components/admin-bars/admin-bars.component';
import { CardViewComponent } from './components/card-view/card-view.component';
import { AdminPageComponent } from './components/admin-page/admin-page.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { BreakpointObserver, LayoutModule } from '@angular/cdk/layout';
import { MatCardModule} from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SalaEsperaComponent } from './components/sala-espera/sala-espera.component';
import { ShowActivitiesComponent } from './components/show-activities/show-activities.component';
import { GameUserComponent } from './components/game-user/game-user.component';

@NgModule({
  declarations: [
    AppComponent,
    PropuestaComponent,
    FormAdminComponent,
    AdminBarsComponent,
    CardViewComponent,
    AdminPageComponent,
    SalaEsperaComponent,
    ShowActivitiesComponent,
    GameUserComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    LayoutModule,
    MatCardModule,
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [BreakpointObserver, AuthServiceService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AtzationInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
