import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActividadComponent } from './module/actividad/actividad.component';
import { EditProfileComponent } from './module/edit-profile/EditProfileComponent';
import { LoginComponent } from './module/login/login.component';
import { RegistroComponent } from './module/registro/registro.component';
import { ProfileComponent } from './module/profile/profile.component';
import { DetallesComponent } from './module/actividad/detalles/detalles.component';
import { ActivityCreateComponent } from './module/activity-create/activity-create.component';
import { RequestsComponent } from './module/requests/requests.component';
import { PassRecoveryComponent } from './module/pass-recovery/pass-recovery.component';
import { ApplicationFormComponent } from './module/application-form/application-form.component';
import { MyActivitiesComponent } from './module/my-activities/my-activities.component';

const routes: Routes = [
  { path: 'home', component:  ActividadComponent },
  { path: 'edit', component: EditProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistroComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'details/:id', component: DetallesComponent }, // Ruta con parámetro de ID,
  { path: 'create', component: ActivityCreateComponent },
  { path: 'requests', component: RequestsComponent },
  { path: 'recovery', component: PassRecoveryComponent },
  { path: 'application', component: ApplicationFormComponent },
  { path: 'activities', component: MyActivitiesComponent },

  { path: '', redirectTo: '/login', pathMatch: 'full' }  // Redirigir a login por defecto
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
