import { Component } from '@angular/core';
import { properties } from '../../../assets/properties/properties';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Password } from 'primeng/password';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  logo = properties.logo;
  formLogin: FormGroup = new FormGroup({});
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void{
    this.formLogin = this.fb.group({
      username: ['',Validators.required],
      password: ['',Validators.required],
    });

  }

  login(){
    if(this.formLogin.invalid){
      this.formLogin.markAllAsTouched();
      for (const key in this.formLogin.controls) {
        this.formLogin.controls [key].markAsDirty();
        
      }
      return;
    }

    console.log(this.formLogin.value);
  }

}

