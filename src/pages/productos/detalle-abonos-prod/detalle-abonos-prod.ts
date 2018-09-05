import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

 import { DatabaseProvider } from '../../../providers/database/database';
 import { Producto } from '../../../interfaces/producto.interface';

@IonicPage()
@Component({
  selector: 'page-detalle-abonos-prod',
  templateUrl: 'detalle-abonos-prod.html',
})
export class DetalleAbonosProdPage {
	idVenta:number;
	abonos:any = [];
  total_suma:number;
  total_restante:number;
	total:number;
	precioVenta:number;
	producto: Producto;

	insertAbonoEmit: boolean;

  constructor(public navCtrl: NavController, 
  			  		public navParams: NavParams,
  			  		public viewCtrl: ViewController,
  			  		public db: DatabaseProvider) {

  	console.log(navParams)
  	this.idVenta = navParams.get('idVenta');
  	this.producto = navParams.get('producto');
  	this.precioVenta = navParams.get('precioVenta');
  	console.log("DetalleAbonosProdPage this.producto", this.producto)
  	console.log("DetalleAbonosProdPage precioVenta", this.precioVenta)
  }

  ngOnInit() {
  		this.verAbonos(this.idVenta);
  		this.insertAbonoEmit = false;
  }


  verAbonos(idVenta){
	  this.total_suma = 0;
	  this.total_restante = 0;
  	console.log("verAbonos", idVenta)
  	this.db.getAbonos(idVenta).then((resp:any)=>{
        if (resp) {
        	this.total_restante = this.precioVenta;
        	for (var i = 0; i < resp.length; ++i) {
        		//console.log("resp[i].abono", resp[i].abono)
        		this.total_suma += resp[i].abono
        		this.total_restante = this.precioVenta - this.total_suma;
        	}
          this.abonos = resp;
          console.log("clientes:", this.abonos)
        }
    }).catch((err)=>{
          console.log( "err::", err );
          //this.hayUsuarios = false;
    });
  }

  // si en el componenete frm-add-abono se inserta un abono este emite "this.insertAbono.emit(true);", 
  // y se actualiza el popup de las ventas del producto al cerrar esta ventana
  insertAbono(insertStatus){
  	
  	this.verAbonos(this.idVenta);
  	// cambiar a true para que cuando se cierre el modal se envie esta variable 
  	// y se actualize el listado de ventas en el modal anterior
  	this.insertAbonoEmit = true; 
  	
  }

  

 

	closeModal($event) { 
	    //this.navCtrl.pop();	
	    this.viewCtrl.dismiss(this.insertAbonoEmit);    
	}   

}
