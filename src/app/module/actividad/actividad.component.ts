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

  ngOnInit(): void {
    this.obtenerOportunidades();
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

  filterByInterest(event: any) {
    const selectedInterest = event.target.value;
    if (selectedInterest === 'all') {
      this.filteredActivityData = this.activityData;
    } else {
      this.filteredActivityData = this.activityData.filter(actividad =>
        actividad.interest === selectedInterest
      );
    }
  }
}
