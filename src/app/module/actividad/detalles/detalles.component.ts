import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-detalles',
  templateUrl: './detalles.component.html',
  styleUrls: ['./detalles.component.css']
})
export class DetallesComponent implements OnInit {
  activityId: string | null = null;
  activityDetails: any = null;
  userData: any = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.activityId = this.route.snapshot.paramMap.get('id');
    if (this.activityId) {
      this.obtenerDetalles(this.activityId);
    }
  }

  async obtenerDetalles(id: string) {
    try {
      const { data } = await axios.get(`http://127.0.0.1:3000/oportunidades/${id}`);
      this.activityDetails = data;
    } catch (err) {
      console.log('Error al obtener los detalles de la actividad');
      console.log({ err });
    }
  }
}
