import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController, ModalController  } from 'ionic-angular';

import { DatabaseProvider } from '../../../providers/database/database';
import { Clientes } from '../../../interfaces/cliente.interface';

import { NuevoClientePage, EditClientePage } from '../../../pages/index.pages';
 
@IonicPage()
@Component({
  selector: 'page-clientes',
  templateUrl: 'clientes.html',
})
export class ClientesPage {
  nuevoCliente = NuevoClientePage
  clientes: Clientes[] = [];
  inicio:number;
  fin:number
  hayUsuarios:boolean;
  hayClientes_scroll:boolean;

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
          public modalCtrl: ModalController,
          public alertCtrl: AlertController,
  			  public db: DatabaseProvider) {
    this.inicio = 0;
    this.fin = 10;
    this.hayUsuarios = true;    
    this.hayClientes_scroll = true;  	
  }

  ngOnInit() {
    //console.log( "ngOnInit" );
    this.recargarUsers();
  }

	recargarUsers(){
    this.hayUsuarios = true;
  	this.hayClientes_scroll = true;
  	this.inicio = 0;
  	this.fin = 15;  
  	this.clientes = []; 
  	this.db.resetClientes();
  	this.db.test_getClientes(this.inicio, this.fin).then((resp:any)=>{
  	    if (resp) {
          this.clientes = resp;
        }
  	}).catch((err)=>{
          console.log( "err::", err );
          this.hayUsuarios = false;
    });
	}

	editarCliente(cliente){
    let modal = this.modalCtrl.create(EditClientePage, { data: cliente });
    
    modal.onDidDismiss( data => {
     // actualizar el producto que editamos en el listado
     //console.log("editarCliente onDidDismiss", data)
      if (data) {
        for (var i = 0; i < this.clientes.length; ++i) {
          if(this.clientes[i].idCliente == data.idCliente){
              this.clientes[i] = data;
          }
        }
      }
    });

    modal.present();
	}
	eliminar_cliente(idCliente:number, nombre: string){
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
        //console.log('DELETE', idCliente);
        this.db.deleteCliente(idCliente).then((resp:any)=>{
            console.log( "deleteProd", resp );
            this.recargarUsers();
        })
      }
    }
    ]      
    }).present();
	}

  push_pageNuevoClienteX(){
    this.recargarUsers();
    this.navCtrl.push(NuevoClientePage);

  }

  push_pageNuevoCliente() {
   
    let modal = this.modalCtrl.create(NuevoClientePage);
    
    modal.onDidDismiss( data => {
     // actualizar el producto que editamos en el listado
      if (data) {
       this.recargarUsers();
      }
    });

    modal.present();
  } 


  doInfinite(infiniteScroll) {
    //console.log('Begin async operation');

    this.inicio+=15
    this.fin = 15;

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

  /*  BUSCADOR */
  getItems(ev: any) {
    const val = ev.target.value;

    if (val && val.trim() != '' && val.length > 3) {

      this.db.buscar_getUser(val.toLowerCase()).then((resp:any)=>{
          console.log("buscar_getUser", resp)
          this.clientes = resp;
          this.hayUsuarios = true;
      }).catch((err)=>{
            console.log( "err::", err );
            this.hayUsuarios = false;
            this.clientes = []; 
      });

    }
  } 
  
  onCancel(){
    //console.log("Cancel search")
    this.recargarUsers();
  }   


}
