import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import Cookies from 'js-cookie';

@Component({
  selector: 'app-my-activities',
  templateUrl: './my-activities.component.html',
  styleUrls: ['./my-activities.component.css']
})
export class MyActivitiesComponent implements OnInit {
  activitiesData: any[] = [];
  userData: any = {}; // Define una propiedad para almacenar los datos del usuario
  isCompanyUser: boolean = false;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.obtenerPerfil().then(() => {
      if (this.isCompanyUser) {
        this.getCompanyActivities();
      } else {
        this.getMyActivities();
      }
    });
  }

  async obtenerPerfil() {
    try {
      const { data } = await axios.get('http://127.0.0.1:3000/usuarios/perfil', {
        headers: {
          Authorization: `Bearer ${JSON.parse(Cookies.get('session') ?? '{}')}`
        }
      });
      this.userData = data; // Asigna los datos del usuario a la propiedad userData
      this.isCompanyUser = this.userData.roles === 'empresa'; // Determina si el usuario es tipo empresa
    } catch (err) {
      console.log('Error al obtener la sesión');
      console.log({ err });
    }
  }

  async getMyActivities() {
    try {
      const token = Cookies.get('session');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('http://127.0.0.1:3000/oportunidades/mis-oportunidades-inscritas', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      });

      this.activitiesData = response.data;
    } catch (error) {
      console.error('Error fetching my activities:', error);
    }
  }

  async getCompanyActivities() {
    try {
      const token = Cookies.get('session');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.get('http://127.0.0.1:3000/oportunidades/mis-actividades', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      });

      this.activitiesData = response.data;
    } catch (error) {
      console.error('Error fetching company activities:', error);
    }
  }

  async startActivity(id: string) {
    try {
      const token = Cookies.get('session');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.patch(`http://127.0.0.1:3000/oportunidades/comenzar-actividad/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      });

      const index = this.activitiesData.findIndex((a) => a.id === id);
      this.activitiesData[index].isActive = true;
      this.activitiesData[index].isFinished = false;
    } catch (error) {
      console.error('Error starting activity:', error);
    }
  }

  async endActivity(id: string) {
    try {
      const token = Cookies.get('session');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.patch(`http://127.0.0.1:3000/oportunidades/terminar-actividad/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      });

      const index = this.activitiesData.findIndex((a) => a.id === id);
      this.activitiesData[index].isActive = false;
      this.activitiesData[index].isFinished = true;
      // Reactivar el botón "Comenzar Actividad"
      this.activitiesData[index].isActive = false;
      this.activitiesData[index].isFinished = false;
    } catch (error) {
      console.error('Error ending activity:', error);
    }
  }

  async deleteActivity(id: string) {
    this.errorMessage = null; // Resetear mensaje de error
    try {
      const token = Cookies.get('session');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.delete(`http://127.0.0.1:3000/oportunidades/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      });

      this.activitiesData = this.activitiesData.filter((activity) => activity.id !== id);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data.message) {
          this.errorMessage = error.response.data.message; // Mostrar mensaje de error específico
        } else {
          this.errorMessage = 'Error al eliminar la actividad.';
        }
      } else {
        console.error('Error deleting activity:', error);
      }
    }
  }

  getTranslatedStatus(status: string): string {
    switch (status) {
      case 'accepted':
        return 'Aceptado';
      case 'rejected':
        return 'Rechazado';
      case 'pending':
        return 'Pendiente';
      default:
        return status;
    }
  }
}
