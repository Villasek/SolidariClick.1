import { Component, OnInit } from '@angular/core';
import { properties } from '../../../assets/properties/properties';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  esAlien: boolean = false;

  constructor(private fb: FormBuilder, private readonly router: Router) {
    this.FormRegister = this.fb.group({
      email: [''],
      nombre: [''],
      rut: [''],
      password: [''],
      direccion: ['']
    });
  }

  ngOnInit(): void {}

  toggleAlien() {
    this.esAlien = !this.esAlien;
    if (this.esAlien) {
      this.FormRegister.get('direccion')?.setValidators([]);
    } else {
      this.FormRegister.get('direccion')?.clearValidators();
    }
    this.FormRegister.get('direccion')?.updateValueAndValidity();
  }

  async submit(){
    
    const user = await axios.post('http://127.0.0.1:3000/usuarios/registrar', {
        email: this.FormRegister.get('email')?.value,
        address: this.FormRegister.get('direccion')?.value,
        password: this.FormRegister.get('password')?.value,
        name: this.FormRegister.get('nombre')?.value,
        rut: this.FormRegister.get('rut')?.value,
    })

    Cookies.set('session', JSON.stringify(user.data.token))

    // Obtener token de las esion
    console.log({
      userSession: JSON.parse(Cookies.get('session') ?? '{}')
    })

    this.router.navigate(['/home'])

  }
}
