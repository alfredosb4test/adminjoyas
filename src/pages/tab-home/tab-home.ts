import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
 

import { TabCatalogoProdPage, TabNuevoProdPage, InicioPage, ClientesPage } from '../index.pages';
 

@IonicPage()
@Component({
  selector: 'page-tab-home',
  templateUrl: 'tab-home.html',
})
export class TabHomePage {
	tab_Inicio = InicioPage;
	tab_Cat = TabCatalogoProdPage;
	tab_Nuevo = TabNuevoProdPage;
	clientesPage = ClientesPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabHomePage');
  }

}
