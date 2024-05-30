import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { properties } from '../../../assets/properties/properties';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pass-recovery',
  templateUrl: './pass-recovery.component.html',
  styleUrl: './pass-recovery.component.css'
})
export class PassRecoveryComponent {
  logo = properties.logo;
  formLogin: FormGroup;

  constructor(private fb: FormBuilder, private readonly router: Router) {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  async submit(){
    
    try {
      console.log({ submit: true})
      const user = await axios.post('http://127.0.0.1:3000/usuarios/iniciar_sesion', {
        email: this.formLogin.get('username')?.value,
        password: this.formLogin.get('password')?.value,
    })

    Cookies.set('session', JSON.stringify(user.data.token))

    // Obtener token de las sesion
    console.log({
      userSession: JSON.parse(Cookies.get('session') ?? '{}')
    })

    this.router.navigate(['/home'])

    
    } catch (error) {
      console.log('Mi loco, fallo al iniciar sesión')
    }


  }
}
