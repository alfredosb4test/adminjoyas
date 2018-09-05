import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-nuevo-cliente',
  templateUrl: 'nuevo-cliente.html',
})
export class NuevoClientePage {

	constructor(public navCtrl: NavController,
				public viewCtrl: ViewController) {

	}

	ionViewDidLoad() {
	console.log('ionViewDidLoad NuevoClientePage');
	}
	closeModal($event) {
		this.viewCtrl.dismiss($event);
	} 
}
