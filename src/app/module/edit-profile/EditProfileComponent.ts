import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;
  imageUrl: string | ArrayBuffer | null = null;
  userData: any = {}; // Define una propiedad para almacenar los datos del usuario

  constructor(private fb: FormBuilder, private profileService: ProfileService) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: [''],
      password: ['', Validators.minLength(6)]
    });
  }

  ngOnInit(): void {
    // Aquí podrías cargar los datos del perfil actual para mostrarlos en el formulario
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      // Asegúrate de enviar la imagen junto con los otros datos del formulario al servicio
      const profileData = {
        ...this.profileForm.value,
        profileImage: this.imageUrl
      };
      this.profileService.updateProfile(profileData).subscribe({
        next: () => {
          console.log('Perfil actualizado correctamente');
          // Aquí podrías redirigir al usuario a otra página o mostrar un mensaje de éxito
        },
        error: (err) => {
          console.error('Error al actualizar perfil:', err);
          // Aquí podrías mostrar un mensaje de error al usuario
        }
      });
    } else {
      console.error('Formulario inválido');
      // Aquí podrías mostrar un mensaje de error al usuario indicando que hay campos inválidos
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target?.result as string | ArrayBuffer | null;
      };
      reader.readAsDataURL(file);
    }
  }
}
