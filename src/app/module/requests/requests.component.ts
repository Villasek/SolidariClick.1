import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import Cookies from 'js-cookie';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  requestsData: any[] = [];

  ngOnInit(): void {
    this.getRequests();
  }

  async getRequests() {
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

      this.requestsData = response.data;
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  }

  async updateRequestStatus(opportunityId: string, userId: string, isApproved: boolean) {
    try {
      const token = Cookies.get('session');
      if (!token) {
        throw new Error('No token found');
      }

      await axios.patch(`http://127.0.0.1:3000/oportunidades/actualizar-solicitud/${opportunityId}/${userId}`, {
        isApproved: isApproved
      }, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      });

      this.getRequests(); // Refresh the requests data
    } catch (error) {
      console.error('Error updating request status:', error);
    }
  }

  async denyRequest(opportunityId: string, userId: string) {
    try {
      await this.updateRequestStatus(opportunityId, userId, false);
    } catch (error) {
      console.error('Error denying request:', error);
    }
  }

  async approveRequest(opportunityId: string, userId: string) {
    try {
      await this.updateRequestStatus(opportunityId, userId, true);
    } catch (error) {
      console.error('Error approving request:', error);
    }
  }

  handleCheckboxChange(event: Event, opportunityId: string, userId: string) {
    const target = event.target as HTMLInputElement;
    const isApproved = target.checked;
    this.updateRequestStatus(opportunityId, userId, isApproved);
  }
}
