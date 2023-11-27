import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormAdminComponent } from './components/form-admin/form-admin.component';
import { AdminPageComponent } from "./components/admin-page/admin-page.component";
import { SalaEsperaComponent } from './components/sala-espera/sala-espera.component';
import { RankingComponent } from "./ranking/ranking.component";
import { GameUserComponent } from './components/game-user/game-user.component';
import { AddActivityComponent } from "./components/add-activity/add-activity.component";
import { PropuestaComponent } from "./components/propuesta/propuesta.component";
import { EditarPropuestaComponent } from "./components/editar-propuesta/editar-propuesta.component";
import { DisplayActivitiesComponent } from "./components/display-activities/display-activities.component";
import { EditarActivitiesComponent } from "./components/editar-activities/editar-activities.component";

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: FormAdminComponent },
  { path: 'indexAdmin', component: AdminPageComponent },
  { path: 'game', component: SalaEsperaComponent },
  { path: 'ranking', component: RankingComponent },
  { path: 'game-user', component: GameUserComponent },
  { path: 'add-activity', component: AddActivityComponent },
  { path: 'add-proposal', component: PropuestaComponent },
  { path: 'editar-propuesta/:id', component: EditarPropuestaComponent },
  { path: 'display-activities', component: DisplayActivitiesComponent },
  { path: 'editar-activities/:id', component: EditarActivitiesComponent },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
