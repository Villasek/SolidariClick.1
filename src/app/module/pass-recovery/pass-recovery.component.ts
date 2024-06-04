import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { properties } from '../../../assets/properties/properties';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pass-recovery',
  templateUrl: './pass-recovery.component.html',
  styleUrls: ['./pass-recovery.component.css']
})
export class PassRecoveryComponent {
  logo = properties.logo;
  formLogin: FormGroup;

  constructor(private fb: FormBuilder, private readonly router: Router) {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  async submit() {
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched(); // Marcar todos los campos como tocados para mostrar mensajes de error
      return;
    }

    try {
      console.log({ submit: true });
      const user = await axios.post('http://127.0.0.1:3000/usuarios/recuperar_contraseña', {
        username: this.formLogin.get('username')?.value,
        email: this.formLogin.get('email')?.value,
      });

      // Manejar la respuesta de recuperación de contraseña (ejemplo)
      console.log('Respuesta de recuperación de contraseña', user.data);

      this.router.navigate(['/login']);
    } catch (error) {
      console.log('Error al recuperar la contraseña');
    }
  }
}
