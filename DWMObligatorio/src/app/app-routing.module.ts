import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormAdminComponent } from './form-admin/form-admin.component';

const routes: Routes = [
  {path: 'login', component: FormAdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
