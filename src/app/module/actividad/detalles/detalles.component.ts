import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {
  activityId: string | null = null;
  activityDetails: any = null;
  userData: any = null;
  mensajeConfirmacion: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.activityId = this.route.snapshot.paramMap.get('id');
    if (this.activityId) {
      this.obtenerDetalles(this.activityId);
    }
  }

  async obtenerDetalles(id: string) {
    try {
      const { data } = await axios.get(`http://127.0.0.1:3000/oportunidades/${id}`);
      this.activityDetails = data;
    } catch (err) {
      console.log('Error al obtener los detalles de la actividad');
      console.log({ err });
    }
  }

  async inscribirse() {
    try {
      // Aquí debes hacer la solicitud para inscribirte.
      // Suponiendo que tienes un endpoint para la inscripción.
      const response = await axios.post(`http://127.0.0.1:3000/inscripcion`, { activityId: this.activityId });

      if (response.status === 200) {
        this.mensajeConfirmacion = 'Se ha inscrito correctamente';
        // Mostrar mensaje emergente de éxito
        alert('Te has inscrito correctamente en la actividad');
      } else {
        this.mensajeConfirmacion = 'Error al inscribirse';
        // Mostrar mensaje emergente de error
        alert('Hubo un error al inscribirse. Por favor, inténtelo de nuevo.');
      }
    } catch (err) {
      console.log('Error al inscribirse');
      console.log({ err });
      this.mensajeConfirmacion = 'Error al inscribirse';
      // Mostrar mensaje emergente de error
      alert('Hubo un error al inscribirse. Por favor, inténtelo de nuevo.');
    }
  }
}
