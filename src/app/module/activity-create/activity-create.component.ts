import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  categories: any[] = [];

  constructor(private fb: FormBuilder, private readonly router: Router) {
    this.formCreateActivity = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      location: ['', Validators.required],
      categoryId: [null, Validators.required],
      points: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  async loadCategories() {
    try {
      const response = await axios.get('http://127.0.0.1:3000/oportunidades/categorias');
      this.categories = response.data;
    } catch (error) {
      console.error('Error loading categories', error);
    }
  }

  async submit() {
    try {
      const token = Cookies.get('session');
      console.log('Token de sesión:', token);
      if (!token) {
        throw new Error('No token found');
      }

      const categoryIdValue = this.formCreateActivity.get('categoryId')?.value;
      console.log('categoryIdValue:', categoryIdValue);

      if (!categoryIdValue) {
        throw new Error('Invalid category ID');
      }

      const formData = new FormData();
      formData.append('name', this.formCreateActivity.get('name')?.value);
      formData.append('description', this.formCreateActivity.get('description')?.value);
      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
      }
      formData.append('date', this.formCreateActivity.get('date')?.value);
      formData.append('location', this.formCreateActivity.get('location')?.value);
      formData.append('categoryId', categoryIdValue.toString());
      formData.append('points', this.formCreateActivity.get('points')?.value);

      console.log('FormData:', formData);

      const response = await axios.post('http://127.0.0.1:3000/oportunidades', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${JSON.parse(token)}`
        }
      });

      console.log('Activity created successfully', response.data);
      alert('La actividad se ha creado exitosamente');
      this.router.navigate(['/home']);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error creating activity', error.response ? error.response.data : error.message);
        alert(`Error creating activity: ${error.response ? error.response.data.message : error.message}`);
      } else if (error instanceof Error) {
        console.error('Unexpected error', error.message);
        alert(`Unexpected error: ${error.message}`);
      } else {
        console.error('Unexpected error', error);
        alert('An unexpected error occurred');
      }
    }
  }
}
