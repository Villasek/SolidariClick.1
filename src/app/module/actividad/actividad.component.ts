import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-actividad',
  templateUrl: './actividad.component.html',
  styleUrls: ['./actividad.component.css']
})
export class ActividadComponent implements OnInit {
  activityData: any[] = []; // Data from the backend
  filteredActivityData: any[] = []; // Data to display based on filters
  categories: any[] = [];

  ngOnInit(): void {
    this.obtenerOportunidades();
    this.obtenerCategorias();
  }

  async obtenerOportunidades() {
    try {
      const { data } = await axios.get('http://127.0.0.1:3000/oportunidades');
      this.activityData = data;
      this.filteredActivityData = data; // Initialize filtered data
    } catch (err) {
      console.log('Error al obtener las actividades');
      console.log({ err });
    }
  }

  async obtenerCategorias() {
    try {
      const { data } = await axios.get('http://127.0.0.1:3000/oportunidades/categorias');
      this.categories = data;
    } catch (err) {
      console.log('Error al obtener las categorías');
      console.log({ err });
    }
  }

  async filterByInterest(event: any) {
    const selectedInterest = event.target.value;
    if (selectedInterest === 'all') {
      this.filteredActivityData = this.activityData;
    } else {
      try {
        const { data } = await axios.get(`http://127.0.0.1:3000/oportunidades/filtrar-categoria/${selectedInterest}`);
        this.filteredActivityData = data;
      } catch (err) {
        console.log('Error al filtrar las actividades por categoría');
        console.log({ err });
      }
    }
  }
}
