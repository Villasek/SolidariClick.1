import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit {
  activityData: any[] = []; // Define una propiedad para almacenar los datos de las actividades

  ngOnInit(): void {
    this.obtenerOportunidades();
  }

  async obtenerOportunidades() {
    try {
      const { data } = await axios.get('http://127.0.0.1:3000/oportunidades');
      this.activityData = data; // Asigna los datos de las actividades
    } catch (err) {
      console.log('Error al obtener las actividades');
      console.log({ err });
    }
  }
}
