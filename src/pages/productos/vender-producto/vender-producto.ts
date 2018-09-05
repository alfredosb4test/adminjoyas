import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController  } from 'ionic-angular';

import { DatabaseProvider } from '../../../providers/database/database';
import { Clientes } from '../../../interfaces/cliente.interface';
import { Producto } from '../../../interfaces/producto.interface';

import { DetalleVentasProdPage } from '../../../pages/index.pages';

@IonicPage()
@Component({
  selector: 'page-vender-producto',
  templateUrl: 'vender-producto.html',
})
export class VenderProductoPage {
  clientes: Clientes[] = [];
  cliente_select: Clientes;
	producto: Producto;
  totalVentasProd: number;
  form: FormGroup;
  chkPago: boolean;
  img: string;
  colorVentas:string; // badge numero de ventas
  errPago:string;
 
  inicio:number;
  fin:number
  hayUsuarios:boolean;
  hayClientes_scroll:boolean;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public db: DatabaseProvider, 
              private toastCtrl: ToastController,
              private _FB: FormBuilder,
              public modalCtrl: ModalController) {

    this.chkPago = false;
  	this.producto = navParams.get('data');
    this.img = this.producto.foto ? this.producto.foto  : "no_imagen.jpg";
  	console.log("VenderProductoPage producto :: ", this.producto);
    this.inicio = 0;
    this.fin = 10;
    this.totalVentasProd = 0;
    this.hayUsuarios = true;    
    this.hayClientes_scroll = true;     
  }

  ngOnInit() {
    //console.log( "ngOnInit" );
    this.recargarUsers();
    this.form = this._FB.group({
      'frm_cliente_select': ['', Validators.required],
      'pagoInicial': [''],
      'pagado': [false]
    });     
  }

	closeModal() { 
	    this.navCtrl.pop();
	} 

  recargarUsers(){
    this.hayUsuarios = true;
    this.inicio = 0;
    this.fin = 1000;  
    this.clientes = []; 
    this.db.resetClientes();
    this.ventasProduct();
    this.db.test_getClientes(this.inicio, this.fin).then((resp:any)=>{
        if (resp) {
          this.clientes = resp;
          console.log("clientes:", this.clientes)
        }
    }).catch((err)=>{
          console.log( "err::", err );
          this.hayUsuarios = false;
    });
  }  

  vender_prod(cliente_select){
    console.log(cliente_select)
    let abono = this.form.controls['pagoInicial'].value;

    if (this.producto.precio_venta < abono) {
      this.errPago = 'El abono es mayor que el restante'
      return;
    }
    this.errPago = '';    

    if (abono == this.producto.precio_venta){
      this.chkPago = true; 
    }else{
      this.chkPago = false; 
    }

    this.db.addVenta(this.producto.idProducto, cliente_select, this.producto.precio_venta, this.chkPago, abono).then((resp:any)=>{
            
        if(abono){
          this.db.addAbono(resp.insertId, abono, "primer pago", this.chkPago, this.producto.precio_venta).then((respAbono:any)=>{ });  
        }
        //this.navCtrl.pop();
        //this.navCtrl.setRoot(TabCatalogoProdPage);

        this.presentToast('Venta guardada correctamente.');

        console.log( "guardar_prod", resp );
        this.form = this._FB.group({
          'frm_cliente_select': ['', Validators.required],
          'pagoInicial': [''],
          'pagado': [false]              
        });
        this.chkPago = false;
        this.cliente_select = null;
        this.ventasProduct();            

    })
  }



  presentToast(msg:string) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'middle'
    });

    toast.onDidDismiss(() => {
      //console.log('Dismissed toast');
    });

    toast.present();
  }

  ventasProduct(){

    this.db.ventasProduct(this.producto.idProducto).then((resp:any)=>{
      console.log("ventasProduct", resp)
      this.totalVentasProd = resp;
      if( this.totalVentasProd > 0 )
        this.colorVentas = "secondary";
      else
        this.colorVentas = "danger";
    });

  }

  verVentasProd(producto){
    console.log("verVentasProd", producto)
    let modal = this.modalCtrl.create(DetalleVentasProdPage, { producto });
    
    modal.present();

  }
 

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    this.inicio+=10
    this.fin = 10;

    console.log( "Inicio: ", this.inicio +  "Fin: ", this.fin );

    this.db.test_getClientes(this.inicio, this.fin).then(
        (resp:any)=>{
          infiniteScroll.complete();
          //this.test_productos = [];
          this.clientes = resp;
          console.log( "doInfinite", resp );
        },
        (err)=>{ this.hayClientes_scroll = err })
      

  }



}
