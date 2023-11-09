import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormAdminComponent } from './form-admin/form-admin.component';
import { AdminPageComponent } from "./admin-page/admin-page.component";
import { SalaEsperaComponent } from './sala-espera/sala-espera.component';
import { GameUserComponent } from './game-user/game-user.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: FormAdminComponent },
  { path: 'indexAdmin', component: AdminPageComponent },
  { path: 'game', component: SalaEsperaComponent},
  { path: 'game-user', component: GameUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
