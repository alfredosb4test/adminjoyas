import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ModalController  } from 'ionic-angular';

 import { DatabaseProvider } from '../../../providers/database/database';
 import { DetalleAbonosProdPage } from '../../../pages/index.pages';
 import { Producto } from '../../../interfaces/producto.interface';

@IonicPage()
@Component({
  selector: 'page-detalle-ventas-prod',
  templateUrl: 'detalle-ventas-prod.html',
})
export class DetalleVentasProdPage {
	producto:Producto;
	clientes:any = [];
  // si hay un abono o se completa una venta se asigna a true y al cerrar el popup se actualiza la pagina anteriorViewController
  insertAbonoEmit: boolean;

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  public db: DatabaseProvider,
          public viewCtrl: ViewController,
  			  public modalCtrl: ModalController) {

  	this.producto = navParams.get('producto');
  	//console.log("DetalleVentasProdPage", this.producto)

  }

  ngOnInit() {
  		this.getVentasProd();
      this.insertAbonoEmit = false;
  }

	getVentasProd(){
    this.db.getVentasProd(this.producto.idProducto).then((resp:any)=>{
        if (resp) {
          this.clientes = resp;
          console.log("getVentasProd :: clientes:", this.clientes)
        }
    }).catch((err)=>{
          console.log( "err::", err );
          //this.hayUsuarios = false;
    });
  }

  verAbonos(idVenta, producto, clientePrecio){
    //console.log("verVentasProd this.clientes.precio", this.clientes[0].precio)
    //console.log("verVentasProd producto", producto)
 
    let modal = this.modalCtrl.create(DetalleAbonosProdPage, { idVenta, producto: producto.nombre, precioVenta: clientePrecio });

    modal.onDidDismiss( data => {
     //si se completo una venta se actualiza el listado de las ventas 
     if (data) {
        this.getVentasProd();
        this.insertAbonoEmit = true;
     }

      //console.log("this.test_productos", this.test_productos)
    });

    modal.present();

  }
/*
	closeModal() { 
	    this.navCtrl.pop();
	} 
  */
  closeModal($event) { 
      //this.navCtrl.pop();  
      this.viewCtrl.dismiss(this.insertAbonoEmit);    
  }    
}
