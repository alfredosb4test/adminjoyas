import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { TabHomePage, TabVentasPage, ClientesPage, InicioPage } from '../index.pages';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	tabHome: any;
	inicio: any =  InicioPage;
	tabCatalogo: any = TabHomePage;
	tabVentas: any = TabVentasPage;
	clientes: any = ClientesPage;	
  constructor(public navCtrl: NavController) {
  	this.tabHome = TabHomePage;
  }

  
	abrirPagina(pagina:any){
		console.log('abrirPagina InicioPage', pagina);
		this.navCtrl.push(pagina)
		//this.changePage.emit(pagina)

  	}

}
