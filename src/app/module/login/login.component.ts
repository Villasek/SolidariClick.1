import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { properties } from '../../../assets/properties/properties';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  logo = properties.logo;
  formLogin: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private readonly router: Router) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  async submit() {
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched(); // Marcar todos los campos como tocados para mostrar mensajes de error
      return;
    }

    try {
      this.errorMessage = null;
      console.log({ submit: true });
      const user = await axios.post('http://127.0.0.1:3000/usuarios/iniciar_sesion', {
        email: this.formLogin.get('email')?.value,
        password: this.formLogin.get('password')?.value,
      });

      Cookies.set('session', JSON.stringify(user.data.token));

      // Obtener token de la sesión
      console.log({
        userSession: JSON.parse(Cookies.get('session') ?? '{}')
      });

      this.router.navigate(['/home']);
    } catch (error) {
      console.log('Error al iniciar sesión', error);
      if (axios.isAxiosError(error) && error.response) {
        this.errorMessage = error.response.data.message;
      } else {
        this.errorMessage = 'Error al iniciar sesión. Por favor, inténtelo de nuevo.';
      }
    }
  }
}
