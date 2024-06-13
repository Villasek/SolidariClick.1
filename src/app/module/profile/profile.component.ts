import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import Cookies from 'js-cookie';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: any = {}; // Define una propiedad para almacenar los datos del usuario
  completedActivities: any[] = []; // Define una propiedad para almacenar las actividades completadas

  ngOnInit(): void {
    this.obtenerPerfil().then();
    this.obtenerActividadesCompletadas().then();
  }

  async obtenerPerfil() {
    try {
      const { data } = await axios.get('http://127.0.0.1:3000/usuarios/perfil', {
        headers: {
          Authorization: `Bearer ${JSON.parse(Cookies.get('session') ?? '{}')}`
        }
      });
      this.userData = data; // Asigna los datos del usuario a la propiedad userData
    } catch (err) {
      console.log('Error al obtener la sesión');
      console.log({ err });
    }
  }

  async obtenerActividadesCompletadas() {
    try {
      const { data } = await axios.get('http://127.0.0.1:3000/oportunidades/mis-oportunidades-completadas', {
        headers: {
          Authorization: `Bearer ${JSON.parse(Cookies.get('session') ?? '{}')}`
        }
      });
      this.completedActivities = data; // Asigna las actividades completadas a la propiedad completedActivities
      console.log(this.completedActivities); // Añade esta línea para depuración
    } catch (err) {
      console.log('Error al obtener las actividades completadas');
      console.log({ err });
    }
  }

  get displayRole(): string {
    if (this.userData.roles === 'empresa') {
      return 'Municipalidad';
    } else if (this.userData.roles === 'usuario') {
      return 'Voluntario';
    } else {
      return this.userData.roles;
    }
  }
}
