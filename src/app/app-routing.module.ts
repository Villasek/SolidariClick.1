import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadComponent } from './module/actividad/actividad.component';
import { EditProfileComponent } from './module/edit-profile/EditProfileComponent';
import { LoginComponent } from './module/login/login.component';

const routes: Routes = [
  { path: 'home', component:  ActividadComponent },
  { path: 'about', component: EditProfileComponent },
  { path: 'contact', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
