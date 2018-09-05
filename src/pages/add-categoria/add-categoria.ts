import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatabaseProvider } from '../../providers/database/database';
import { Categoria } from '../../interfaces/categoria.interface';

import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-add-categoria',
  templateUrl: 'add-categoria.html',
})
export class AddCategoriaPage {

	form: FormGroup;
	insertCategoriaEmit: boolean;
	categorias: Categoria[] = [];
	hayCategorias: boolean;

  constructor(public navCtrl: NavController, 
  						public navParams: NavParams,
  						public viewCtrl: ViewController,
  						private _FB: FormBuilder, 
  						private toastCtrl: ToastController,
  						public db: DatabaseProvider) {

  	this.insertCategoriaEmit = false;
  }

  ngOnInit() {
  	this.categorias = []; 
    this.form = this._FB.group({
		'nombre': ['Generico', [Validators.required, Validators.minLength(3), Validators.maxLength(18)] ]		
    });
  }

  guardar_categoria(){
  	let nombre = this.form.controls['nombre'].value;
  	this.db.addCategoria(nombre).then((respAbono:any)=>{ 

				this.presentToast('Datos guardados correctamente.');

				//console.log( "addAbono", respAbono );
		    this.form = this._FB.group({
				'nombre': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(18)] ]		
		    });

				this.insertCategoriaEmit = true;

		}).catch((err)=>{
          console.log( "err::", err );
          this.presentToast('Error con la Base de datos.');
          this.insertCategoriaEmit = false;
    });
  }

	closeModal($event) { 
	    //this.navCtrl.pop();	
	    this.viewCtrl.dismiss(this.insertCategoriaEmit);    
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
