import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController, ModalController  } from 'ionic-angular';

import { DatabaseProvider } from '../../providers/database/database';
import { Producto } from '../../interfaces/producto.interface';

import { EditarProductoPage, VenderProductoPage, TabNuevoProdPage } from '../../pages/index.pages';



@IonicPage()
@Component({
  selector: 'page-tab-catalogo-prod',
  templateUrl: 'tab-catalogo-prod.html',
})
export class TabCatalogoProdPage implements OnInit {
	test_productos: Producto[] = [];
  pageNuevoProd = TabNuevoProdPage;
  inicio:number;
  fin:number
  hayProductos:boolean;
  hayProductos_scroll:boolean;

  @ViewChild('itemsProd') itemsProd: ElementRef

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  public alertCtrl: AlertController,
  			  public modalCtrl: ModalController,
  			  public db: DatabaseProvider) {
 
    this.inicio = 0;
    this.fin = 10;
    this.hayProductos = true;
    this.hayProductos_scroll = true;

  
  }

  ngOnInit() {
    //console.log( "ngOnInit" );
    this.recargarProductos();
  }

  recargarProductos(){
    this.hayProductos = true;
    this.hayProductos_scroll = true;
    this.inicio = 0;
    this.fin = 10;  
    this.test_productos = []; 
    this.db.resetProductos();
    this.db.test_getProd(this.inicio, this.fin).then((resp:any)=>{
        this.test_productos = resp;
    }).catch((err)=>{
          console.log( "err::", err );
          this.hayProductos = false;
    });
  }

  eliminar_prod(idProducto:number, nombre: string){
  	//let url = `${URL_SERVICIOS}/productos`
  	this.alertCtrl.create({
  	title: "Eliminar "+nombre,
		buttons: [
		{
		  text: 'Cancelar',
		  handler: () => {
		    console.log('Disagree clicked');
		  }
		},
		{
		  text: 'Aceptar',
		  handler: () => {
		    console.log('DELETE', idProducto);
        this.db.deleteProd(idProducto).then((resp:any)=>{
            console.log( "deleteProd", resp );
            this.recargarProductos();
        })
		  }
		}
		]  		
  	}).present();
  }

  editarProducto(producto) {
 	
    let modal = this.modalCtrl.create(EditarProductoPage, { data: producto });
    
    modal.onDidDismiss( data => {
      console.log("editarProducto onDidDismiss data", data)
     // actualizar el producto que editamos en el listado
     if (data) {
        for (var i = 0; i < this.test_productos.length; ++i) {
          if(this.test_productos[i].idProducto == data.idProducto){
              this.test_productos[i] = data;
          }
        }
     }

      //console.log("this.test_productos", this.test_productos)
    });

    modal.present();
  }  

  push_pageNuevoProd(){
    //this.recargarProductos();   
    //this.navCtrl.push(TabNuevoProdPage);

    let modal = this.modalCtrl.create(TabNuevoProdPage);
    
    modal.onDidDismiss( data => {
     // console.log("push_pageNuevoProd onDidDismiss", data)
     // actualizar el producto que editamos en el listado
      if (data) {
       this.recargarProductos();
      }
    }); 

    modal.present();   
  }



  venderProducto(producto){
 	
    let modal = this.modalCtrl.create(VenderProductoPage, { data: producto });
    
    modal.present();

  }
  /*  BUSCADOR */
  getItems(ev: any) {
    const val = ev.target.value;

    if (val && val.trim() != '' && val.length > 3) {

      this.db.buscar_getProd(val.toLowerCase()).then((resp:any)=>{
          console.log("buscar_getProd", resp)
          this.test_productos = resp;
          this.hayProductos = true;
      }).catch((err)=>{
            console.log( "err::", err );
            this.hayProductos = false;
            this.test_productos = []; 
      });

    }
  }

  onCancel(){
    //console.log("Cancel search")
    this.recargarProductos();
  }

  doInfinite(infiniteScroll) {
    //console.log('Begin async operation');

    this.inicio+=10
    this.fin = 10;

    console.log( "Inicio: ", this.inicio +  "Fin: ", this.fin );

    this.db.test_getProd(this.inicio, this.fin).then(
        (resp:any)=>{
          infiniteScroll.complete();
          //this.test_productos = [];
          this.test_productos = resp;
          console.log( "doInfinite", resp );
        },
        (err)=>{ this.hayProductos_scroll = err })
      

  }

}
