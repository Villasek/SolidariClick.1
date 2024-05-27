import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Cookies from 'js-cookie';

@Component({
  selector: 'app-footer-navigation',
  templateUrl: './footer-navigation.component.html',
  styleUrl: './footer-navigation.component.css'
})
export class FooterNavigationComponent {
constructor (private readonly router: Router){}

  logout(){
    Cookies.remove('session')
    this.router.navigate(['/login'])
  }
}
