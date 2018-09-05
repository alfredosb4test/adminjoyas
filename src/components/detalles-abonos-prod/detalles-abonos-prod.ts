import { Component } from '@angular/core';

/**
 * Generated class for the DetallesAbonosProdComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'detalles-abonos-prod',
  templateUrl: 'detalles-abonos-prod.html'
})
export class DetallesAbonosProdComponent {

  text: string;

  constructor() {
    console.log('Hello DetallesAbonosProdComponent Component');
    this.text = 'Hello World';
  }

}
