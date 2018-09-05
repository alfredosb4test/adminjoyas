import { Component } from '@angular/core';
import { Platform, MenuController, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
 
import { InicioPage, TabHomePage, TabVentasPage, ClientesPage } from '../pages/index.pages';
 
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabHomePage;
  inicio: any =  InicioPage;
  tabCatalogo: any = TabHomePage;
  tabVentas: any = TabVentasPage;
  clientes: any = ClientesPage;

  constructor(platform: Platform, 
              statusBar: StatusBar, 
              splashScreen: SplashScreen,
              public app: App,
              private menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  abrirPagina(pagina:any, tipo){
    if(tipo == 'rootPage'){
      console.log("MyApp abrirPagina", pagina)
      this.rootPage = pagina;
      this.menuCtrl.close();
    }else 
      this.app.getActiveNav().setRoot(InicioPage); 

  }

  abrirPaginaEmmit(even){
    console.log('abrirPaginaEmmit', even)
  }

}

