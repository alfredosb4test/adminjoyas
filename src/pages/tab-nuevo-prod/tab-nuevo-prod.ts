import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';



@IonicPage()
@Component({
  selector: 'page-tab-nuevo-prod',
  templateUrl: 'tab-nuevo-prod.html',
})
export class TabNuevoProdPage {

	constructor(public navCtrl: NavController, 
				  public navParams: NavParams,  
				  public viewCtrl: ViewController) {


	}

	ionViewDidLoad() {
	console.log('ionViewDidLoad TabNuevoProdPage');
	}



	closeModal($event) {
		this.viewCtrl.dismiss($event);
	} 	

}
