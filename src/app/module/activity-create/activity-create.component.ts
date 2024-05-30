import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity-create',
  templateUrl: './activity-create.component.html',
  styleUrls: ['./activity-create.component.css']
})
export class ActivityCreateComponent implements OnInit {
  formCreateActivity: FormGroup;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private readonly router: Router) {
    this.formCreateActivity = this.fb.group({
      name: [''],
      description: [''],
      date: [''],
      location: ['']
    });
  }

  ngOnInit(): void {}

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  async submit() {
    try {
      const token = Cookies.get('session');  // Obtener el token desde las cookies
      console.log('Token de sesión:', token); // Mostrar el token por consola
      if (!token) {
        throw new Error('No token found');
      }

      const formData = new FormData();
      formData.append('name', this.formCreateActivity.get('name')?.value);
      formData.append('description', this.formCreateActivity.get('description')?.value);
      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }
      formData.append('date', this.formCreateActivity.get('date')?.value);
      formData.append('location', this.formCreateActivity.get('location')?.value);

      const response = await axios.post('http://127.0.0.1:3000/oportunidades', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`  // Incluir el token en los encabezados
        }
      });

      console.log('Activity created successfully', response.data);
      this.router.navigate(['/activities']);
    } catch (error) {
      console.error('Error creating activity', error);
    }
}
}