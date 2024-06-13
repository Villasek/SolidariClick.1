import { Component, OnInit } from '@angular/core';
import { properties } from '../../../assets/properties/properties';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  FormRegister: FormGroup;
  logo = properties.logo;
  esEmpresa: boolean = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private readonly router: Router) {
    this.FormRegister = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      nombre: ['', Validators.required],
      rut: ['', Validators.required],
      password: ['', Validators.required],
      direccion: ['']
    });
  }

  ngOnInit(): void {}

  botonEmpresa() {
    this.esEmpresa = !this.esEmpresa;
    if (this.esEmpresa) {
      this.FormRegister.get('direccion')?.setValidators([Validators.required]);
    } else {
      this.FormRegister.get('direccion')?.clearValidators();
    }
    this.FormRegister.get('direccion')?.updateValueAndValidity();
  }

  async submit() {
    if (this.FormRegister.invalid) {
      this.FormRegister.markAllAsTouched(); // Marcar todos los campos como tocados para mostrar mensajes de error
      return;
    }

    try {
      this.errorMessage = null;
      const user = await axios.post('http://127.0.0.1:3000/usuarios/registrar', {
        email: this.FormRegister.get('email')?.value,
        address: this.FormRegister.get('direccion')?.value,
        password: this.FormRegister.get('password')?.value,
        name: this.FormRegister.get('nombre')?.value,
        rut: this.FormRegister.get('rut')?.value,
      });

      Cookies.set('session', JSON.stringify(user.data.token));

      // Obtener token de la sesión
      console.log({
        userSession: JSON.parse(Cookies.get('session') ?? '{}')
      });

      this.router.navigate(['/home']);
    } catch (error) {
      console.log('Error al registrar', error);
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data.message.includes('Este usuario ya existe')) {
          this.errorMessage = 'El correo electrónico o el RUT ya están registrados. Por favor, use diferentes credenciales.';
        } else {
          this.errorMessage = error.response.data.message;
        }
      } else {
        this.errorMessage = 'Error al registrar. Por favor, inténtelo de nuevo.';
      }
    }
  }
}
