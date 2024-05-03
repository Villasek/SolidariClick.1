import { Component, OnInit } from '@angular/core';
import { properties } from '../../../assets/properties/properties';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  value1!: String;
  logo = properties.logo;
  FormRegister =new FormGroup({});

}
