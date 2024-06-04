import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import Cookies from 'js-cookie';

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

  constructor(private route: ActivatedRoute, private router: Router) {}

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

  async postular() {
    try {
      const token = Cookies.get('session');  // Obtener el token desde las cookies
      console.log('Token de sesión:', token); // Mostrar el token por consola
      if (!token) {
        throw new Error('No token found');
      }
  
      const motivoPostulacion = (document.getElementById('texto') as HTMLInputElement).value;
      if (!motivoPostulacion) {
        throw new Error('Motivo de postulación no proporcionado');
      }
  
      const response = await axios.post(`http://127.0.0.1:3000/oportunidades/postular/${this.activityId}`, {
        description: motivoPostulacion,
      }, {
        headers: {
          'Authorization': `Bearer ${JSON.parse(token)}`  // Incluir el token en los encabezados
        }
      });
  
      console.log('Successfully applied to the opportunity', response.data);
  
      // Mostrar mensaje emergente de éxito
      alert('Te has postulado exitosamente a esta oportunidad');
  
      // Redirigir a la página de inicio
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error al postularse a la oportunidad', error);
  
      // Mostrar mensaje emergente de error
      alert('Hubo un error al postularse a la oportunidad. Por favor, inténtelo de nuevo.');
    }
  }
  
}  