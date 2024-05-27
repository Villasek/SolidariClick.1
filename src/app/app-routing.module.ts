import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadComponent } from './module/actividad/actividad.component';
import { EditProfileComponent } from './module/edit-profile/EditProfileComponent';
import { LoginComponent } from './module/login/login.component';
import { RegistroComponent } from './module/registro/registro.component';
import { ProfileComponent } from './profile/profile.component';
import { DetallesComponent } from './module/actividad/detalles/detalles.component';
import { ActivityCreateComponent } from './module/activity-create/activity-create.component';

const routes: Routes = [
  { path: 'home', component:  ActividadComponent },
  { path: 'edit', component: EditProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistroComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'details', component: DetallesComponent },
  { path: 'create', component: ActivityCreateComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' }  // Redirigir a login por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
