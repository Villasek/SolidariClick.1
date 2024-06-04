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

      const response = await axios.get('http://127.0.0.1:3000/oportunidades/solicitudes-empresa', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      });

      this.requestsData = response.data;
    } catch (error) {
      console.error('Error fetching requests:', error);
    }
  }

  getUserStatus(status: string): string {
    switch (status) {
      case 'accepted':
        return 'Aceptado';
      case 'rejected':
        return 'Denegado';
      default:
        return 'Pendiente';
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

      this.requestsData = this.requestsData.map(request => {
        if (request.opportunityId === opportunityId && request.userId === userId) {
          request.userStatus = isApproved ? 'accepted' : 'rejected';
        }
        return request;
      });
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
}
