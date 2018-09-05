import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';
import { ModalController  } from 'ionic-angular';

import { DatabaseProvider } from '../../providers/database/database';
import { Producto } from '../../interfaces/producto.interface';
import { Categoria } from '../../interfaces/categoria.interface';
import { AddCategoriaPage } from '../../pages/index.pages';

import { ToastController } from 'ionic-angular';

@Component({
  selector: 'frm-producto',
  templateUrl: 'frm-producto.html'
})
export class FrmProductoComponent {
	productoDb: Producto;
	cantidad: number;
	btn_titulo:string;
	form: FormGroup;
	categorias: Categoria[] = [];
	hayCategorias: boolean;
	@Input('producto') producto: Producto;
	@Input('tipo') tipo:string;

	@Output() productoEdit: EventEmitter<Producto> = new EventEmitter();
	@Output() productoNuevo: EventEmitter<Producto> = new EventEmitter();

  constructor(public navCtrl: NavController, 
  			  private _FB: FormBuilder, 
  			  public db: DatabaseProvider, 
  			  private toastCtrl: ToastController,
  			  public modalCtrl: ModalController) {
  	this.hayCategorias = false;

  }

  ngOnInit(){
  	this.btn_titulo = this.tipo;
  	this.getCategorias(); 

    if (this.tipo == "Editar") {
	    this.db.test_getProdOne(this.producto.idProducto).then((resp: Producto)=>{
	    	//console.log("FrmProductoComponent resp:", resp[0].nombre);
	      	this.productoDb = resp[0];      
	 
	     	console.log("FrmProductoComponent this.productoDb.nombre:", this.productoDb);
		    this.form = this._FB.group({
				'idProducto': [this.productoDb.idProducto],		
				'nombre': [this.productoDb.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(35)] ],		
				'descripcion': [this.productoDb.descripcion, [Validators.maxLength(200)] ],
				'nota': [this.productoDb.nota, [Validators.maxLength(200)] ],
				'precio': [this.productoDb.precio, [Validators.required, Validators.minLength(1), Validators.maxLength(8)] ],
				'precio_venta': [this.productoDb.precio_venta, [Validators.required, Validators.minLength(1), Validators.maxLength(8)] ],
				'cantidad': [this.productoDb.cantidad, Validators.required],
				'categoria': [this.productoDb.categoria, Validators.required],
				'activo': [this.productoDb.activo],
				'foto': [this.productoDb.foto]
		    });  
		    this.cantidad = this.productoDb.cantidad;		    
	    });
		}else{    

	    this.form = this._FB.group({
			'nombre': ['prod ', [Validators.required, Validators.minLength(3), Validators.maxLength(35)] ],		
			'descripcion': ['descripcion', [Validators.maxLength(200)] ],
			'nota': ['nota', [Validators.maxLength(200)] ],
			'precio': ['5', [Validators.required, Validators.minLength(1), Validators.maxLength(8)] ],
			'precio_venta': ['5.50', [Validators.required, Validators.minLength(1), Validators.maxLength(8)] ],
			'cantidad': ['1', Validators.required],
			'categoria': ['', Validators.required],
			'foto': [""]		
	    });
	    this.cantidad = 0;
	}

  }

  getCategorias(){
  	this.categorias = []; 
  	this.db.resetCategorias();
  	
    this.db.test_getCategorias(0, 1000).then((resp:any)=>{
        if (resp) {
          this.categorias = resp;
          this.hayCategorias = true;
          console.log("categorias:", this.categorias)
        }
    }).catch((err)=>{
          console.log( "err::", err );
          this.hayCategorias = false;
    });
	}

  guardar_prod(tipo:string){
  	console.log( "guardar_prod tipo", tipo );
  	if (this.form.valid) {
  		
  		
  		if (this.tipo == "Editar") {
	  		this.db.editProd(this.form.value).then((resp:any)=>{
	      		this.presentToast('Producto agregado correctamente.');
	      		//this.navCtrl.pop();
	      		console.log( "editProd", resp );
	      		this.productoEdit.emit(this.form.value);
	    	})
  		}else{
	  		this.db.addProd(this.form.value).then((resp:any)=>{
	      		this.presentToast('Producto guardado correctamente.');
	      		//this.navCtrl.pop();
	      		//this.navCtrl.setRoot(TabCatalogoProdPage);
	      		console.log( "guardar_prod", resp );
	      		this.productoNuevo.emit(resp);
	    	})
	  	} 
  		
  	} 
  }

  addCategoria(){
 
    let modal = this.modalCtrl.create(AddCategoriaPage, {  });

    modal.onDidDismiss( data => {
     //si se completo una venta se actualiza el listado de las ventas 
     if (data) {
        this.getCategorias();
     }

      //console.log("this.test_productos", this.test_productos)
    });

    modal.present(); 
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

}
