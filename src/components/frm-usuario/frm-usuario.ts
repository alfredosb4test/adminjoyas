import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';

import { DatabaseProvider } from '../../providers/database/database';
import { Clientes } from '../../interfaces/cliente.interface';

import { ToastController } from 'ionic-angular';


@Component({
  selector: 'frm-usuario',
  templateUrl: 'frm-usuario.html'
})
export class FrmUsuarioComponent {

	clienteDb: Clientes;
	btn_titulo:string;
	form: FormGroup;
	@Input('cliente') cliente: Clientes;
	@Input('tipo') tipo:string;

	@Output() clienteEdit: EventEmitter<Clientes> = new EventEmitter();
	@Output() clienteNuevo: EventEmitter<Clientes> = new EventEmitter();

  constructor(public navCtrl: NavController, private _FB: FormBuilder, public db: DatabaseProvider, private toastCtrl: ToastController) {


  }

  ngOnInit(){
  	this.btn_titulo = this.tipo; 
    if (this.tipo == "Editar") {
	    this.db.test_getClienteOne(this.cliente.idCliente).then((resp: Clientes)=>{
	    	//console.log("FrmProductoComponent resp:", resp[0].nombre);
	      	this.clienteDb = resp[0];      
	 
	     	//console.log("FrmProductoComponent this.clienteDb.nombre:", this.clienteDb.nombre);
		    this.form = this._FB.group({
				'idCliente': [this.clienteDb.idCliente],		
				'nombre': [this.clienteDb.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(35)] ],		
				'direccion': [this.clienteDb.direccion, [Validators.required, Validators.minLength(5), Validators.maxLength(200)] ],
				'telefono': [this.clienteDb.telefono, [Validators.required, Validators.minLength(6), Validators.maxLength(20)] ],
				'activo': [this.clienteDb.activo],
				'foto': [this.clienteDb.foto]
		    });  	    
	    });
	}else{    
	    this.form = this._FB.group({
			'nombre': ['prod ', [Validators.required, Validators.minLength(3), Validators.maxLength(35)] ],		
			'direccion': ['direccion', [Validators.required, Validators.minLength(5), Validators.maxLength(200)] ],
			'telefono': ['telefono', [Validators.required, Validators.minLength(6), Validators.maxLength(20)] ],
			'foto': [""]		
	    });
	}

  }

  guardar_cliente(tipo:string){
  	//console.log( "guardar_cliente tipo", tipo );
  	if (this.form.valid) {
  		if (this.tipo == "Editar") {
	  		this.db.editCliente(this.form.value).then((resp:any)=>{
	      		this.presentToast('Cliente actualizado correctamente.');
	      		//this.navCtrl.pop();
	      		//console.log( "editCliente", resp );
	      		this.clienteEdit.emit(this.form.value);
	    	}).catch((err)=>{
	    		console.log( "err::", err );
	    		this.presentToast('Error al actualizar.');
	    	});
  		}else{
	  		this.db.addCliente(this.form.value).then((resp:any)=>{
	      		this.presentToast('Cliente guardado correctamente.');
	      		//this.navCtrl.pop();
	      		//this.navCtrl.setRoot(TabCatalogoProdPage);
	      		//console.log( "guardar_prod", resp );
	      		this.clienteNuevo.emit(resp);
	    	}).catch((err)=>{
	    		console.log( "err::", err );
	    		this.presentToast('Error al guardar.');
	    	});
	  	} 
  		
  	} 
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
