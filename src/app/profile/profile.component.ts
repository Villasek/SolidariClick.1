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

  ngOnInit(): void {
    this.obtenerPerfil().then();
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
}
