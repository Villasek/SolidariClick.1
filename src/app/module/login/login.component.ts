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

  constructor(private fb: FormBuilder, private readonly router: Router) {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  /*
  login(): void {
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      Object.keys(this.formLogin.controls).forEach(controlName =>
        this.formLogin.controls[controlName].markAsDirty()
      );
      return;
    }

    console.log(this.formLogin.value);
  }
*/
  async submit(){
    
    try {
      console.log({ submit: true})
      const user = await axios.post('http://127.0.0.1:3000/usuarios/iniciar_sesion', {
        email: this.formLogin.get('username')?.value,
        password: this.formLogin.get('password')?.value,
    })

    Cookies.set('session', JSON.stringify(user.data.token))

    // Obtener token de las esion
    console.log({
      userSession: JSON.parse(Cookies.get('session') ?? '{}')
    })

    this.router.navigate(['/home'])

    
    } catch (error) {
      console.log('Mi loco, fallo al iniciar sesión')
    }


  }
}
