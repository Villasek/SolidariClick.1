import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = '...'; // Aquí debes proporcionar la URL de tu API para actualizar el perfil

  constructor(private http: HttpClient) { }

  updateProfile(profileData: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, profileData);
  }
}
