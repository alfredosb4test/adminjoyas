import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { MyApp } from './app.component';
import { HomePage, 
         TabHomePage, 
         TabCatalogoProdPage, 
         TabEditProdPage, 
         TabNuevoProdPage,
         TabVentasPage,
         ClientesPage, 
         NuevoClientePage,
         EditClientePage,
         InicioPage,
         EditarProductoPage, VenderProductoPage,
         DetalleVentasProdPage,
         DetalleAbonosProdPage,
         AddCategoriaPage } from '../pages/index.pages';

import { FrmProductoComponent } from '../components/frm-producto/frm-producto';
import { FrmUsuarioComponent } from '../components/frm-usuario/frm-usuario';
import { FrmAddAbonoComponent } from '../components/frm-add-abono/frm-add-abono';
import { DetalleVentasProdComponent } from '../components/detalle-ventas-prod/detalle-ventas-prod';


import { SQLite } from '@ionic-native/sqlite';

import { DatabaseProvider } from '../providers/database/database';

import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    HomePage, 
    TabHomePage, 
    TabCatalogoProdPage, 
    TabEditProdPage, 
    TabNuevoProdPage,
    TabVentasPage,
    ClientesPage,
    NuevoClientePage,
    EditClientePage,    
    InicioPage,
    EditarProductoPage,
    VenderProductoPage,
    DetalleVentasProdPage,
    FrmProductoComponent,
    FrmUsuarioComponent,
    FrmAddAbonoComponent,
    DetalleVentasProdComponent,
    DetalleAbonosProdPage,
    AddCategoriaPage
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage, 
    TabHomePage, 
    TabCatalogoProdPage, 
    TabEditProdPage, 
    TabNuevoProdPage,
    TabVentasPage,
    ClientesPage,
    NuevoClientePage,
    EditClientePage,     
    InicioPage,
    EditarProductoPage,
    VenderProductoPage,
    DetalleVentasProdPage,
    FrmProductoComponent,
    FrmUsuarioComponent,
    FrmAddAbonoComponent,
    DetalleVentasProdComponent,
    DetalleAbonosProdPage,
    AddCategoriaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    Camera
  ]
})
export class AppModule {}
