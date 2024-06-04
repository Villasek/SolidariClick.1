import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './module/login/login.component';
import { ActividadComponent } from './module/actividad/actividad.component';
import { DetallesComponent } from './module/actividad/detalles/detalles.component';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { RegistroComponent } from './module/registro/registro.component';
import { EditProfileComponent } from './module/edit-profile/EditProfileComponent';
import { HttpClientModule } from '@angular/common/http';
import { FooterNavigationComponent } from './module/footer-navigation/footer-navigation.component';
import { ProfileComponent } from './module/profile/profile.component';
import { ActivityCreateComponent } from './module/activity-create/activity-create.component';
import { RequestsComponent } from './module/requests/requests.component';
import { PassRecoveryComponent } from './module/pass-recovery/pass-recovery.component';
import { ApplicationFormComponent } from './module/application-form/application-form.component';
import { MyActivitiesComponent } from './module/my-activities/my-activities.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ActividadComponent,
    DetallesComponent,
    RegistroComponent,
    EditProfileComponent,
    FooterNavigationComponent,
    ProfileComponent,
    ActivityCreateComponent,
    RequestsComponent,
    PassRecoveryComponent,
    ApplicationFormComponent,
    MyActivitiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputTextModule,
    FormsModule,
    PasswordModule,
    ButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
