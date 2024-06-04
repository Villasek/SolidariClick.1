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
  activityData: any = {};

  ngOnInit(): void {
    this.getMyActivities();
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
}
