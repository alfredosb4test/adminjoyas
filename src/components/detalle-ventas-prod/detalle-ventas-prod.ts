import { Component } from '@angular/core';

/**
 * Generated class for the DetalleVentasProdComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'detalle-ventas-prod',
  templateUrl: 'detalle-ventas-prod.html'
})
export class DetalleVentasProdComponent {

  text: string;

  constructor() {
    console.log('Hello DetalleVentasProdComponent Component');
    this.text = 'Hello World';
  }

}
