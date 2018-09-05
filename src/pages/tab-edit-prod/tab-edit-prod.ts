import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

 

@IonicPage()
@Component({
  selector: 'page-tab-edit-prod',
  templateUrl: 'tab-edit-prod.html',
})
export class TabEditProdPage {
 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabEditProdPage');
  }

}
