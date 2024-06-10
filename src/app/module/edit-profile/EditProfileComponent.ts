import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import Cookies from 'js-cookie';

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  editProfileForm: FormGroup;
  categories: Category[] = [];

  private apiUrl = 'http://127.0.0.1:3000/usuarios';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.editProfileForm = this.fb.group({
      name: [''],
      profilePicture: [null],
      gender: [''],
      age: [null],
      interests: [[]]
    });
  }

  ngOnInit(): void {
    this.loadUserProfile();
    this.loadCategories();
  }

  loadUserProfile() {
    const token = Cookies.get('session');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(token ?? '{}')}`
    });

    this.http.get<any>(`${this.apiUrl}/perfil`, { headers }).subscribe(profile => {
      this.editProfileForm.patchValue({
        name: profile.name,
        gender: profile.gender,
        age: profile.age,
        interests: profile.interests
      });
    });
  }

  loadCategories() {
    this.http.get<Category[]>('http://127.0.0.1:3000/oportunidades/categorias').subscribe(categories => {
      this.categories = categories;
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    this.editProfileForm.patchValue({
      profilePicture: file
    });
  }

  onCheckboxChange(event: any) {
    const interestsControl = this.editProfileForm.get('interests');
    if (interestsControl) {
      const interestsArray = interestsControl.value as number[];
      if (event.target.checked) {
        interestsArray.push(event.target.value);
      } else {
        const index = interestsArray.indexOf(event.target.value);
        if (index > -1) {
          interestsArray.splice(index, 1);
        }
      }
      interestsControl.setValue(interestsArray);
    }
  }

  updateProfile() {
    const formData = new FormData();
    formData.append('name', this.editProfileForm.get('name')?.value);
    formData.append('gender', this.editProfileForm.get('gender')?.value);
    formData.append('age', this.editProfileForm.get('age')?.value);
    formData.append('profilePicture', this.editProfileForm.get('profilePicture')?.value);
  
    const interests = this.editProfileForm.get('interests')?.value;
    interests.forEach((interest: any) => {
      formData.append('interests', interest);
    });
  
    const token = Cookies.get('session');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${JSON.parse(token ?? '{}')}`
    });
  
    this.http.put(`${this.apiUrl}/actualizar-perfil`, formData, { headers }).subscribe(response => {
      this.router.navigate(['/profile']);
    }, error => {
      console.error('Error updating profile:', error);
    });
  }
  
}
