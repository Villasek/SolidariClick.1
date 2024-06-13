import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-premios',
  templateUrl: './premios.component.html',
  styleUrls: ['./premios.component.css']
})
export class PremiosComponent implements OnInit {
  premios: any[] = [
    {
      name: 'Tarjeta de Regalo',
      description: 'Tarjeta de regalo de $50 para tu tienda favorita.',
      points: 500,
      imageUrl: 'assets/images/giftcard.jpg'
    },
    {
      name: 'Descuento en Ropa',
      description: 'Descuento del 20% en tu próxima compra de ropa.',
      points: 300,
      imageUrl: 'assets/images/descuento.jpg'
    },
    {
      name: 'Entrada de Cine',
      description: 'Entrada gratuita para una película en el cine.',
      points: 200,
      imageUrl: 'assets/images/cine.jpg'
    }
  ];

  constructor() { }

  ngOnInit(): void { }

  canjearPremio(premio: any) {
    alert(`Has canjeado ${premio.name} por ${premio.points} puntos.`);
    // Aquí podrías añadir lógica adicional para manejar el canje
  }
}
