import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Clientes } from '../../../interfaces/cliente.interface';
 

@IonicPage()
@Component({
  selector: 'page-edit-cliente',
  templateUrl: 'edit-cliente.html',
})
export class EditClientePage {
	cliente: Clientes
	constructor(public navCtrl: NavController, 
				public navParams: NavParams,
				public viewCtrl: ViewController) {
		this.cliente = this.navParams.get("data");
		//console.log("EditarClientePage::", this.cliente)  	
	}

 
	closeModal($event) {
		//console.log("closeModal dismiss:: $event", $event)  	
		this.viewCtrl.dismiss($event);
	} 

}
