import { Component, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
 
import { TabHomePage, TabVentasPage, ClientesPage, DetalleVentasProdPage } from '../index.pages';
import { ModalController  } from 'ionic-angular';
 
import { DatabaseProvider } from '../../providers/database/database';
import { Producto } from '../../interfaces/producto.interface';
import { Chart } from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-inicio',
  templateUrl: 'inicio.html',
})
export class InicioPage {
	tabHome: any; 
	tabCatalogo: any = TabHomePage;
	tabVentas: any = TabVentasPage;
	clientes: any = ClientesPage;
	ventasPendientesCarrousel: any = [];
	ventasFinalizadasCarrousel: any = [];
	ventasPendientes: any;
	ventasFinalizadas: string;
	producto:Producto;
	segment_ventas: string;
	showGraficas:boolean;

	@ViewChild('graficasCanvas') graficasCanvas;	// graficas
	@ViewChild('cont_graficas_canvas') cont_graficas_canvas: ElementRef;	// graficas
	graficasChart: any;

	@Output() changePage: EventEmitter<any> = new EventEmitter();

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams,
  			  public db: DatabaseProvider,
  			  public modalCtrl: ModalController ) {
  	this.tabHome = TabHomePage;
  	this.ventasPendientes = '0';
  	this.ventasFinalizadas = '0';
  	this.showGraficas = false;
  }

  ionViewWillEnter() {
  	this.cargarDatos();
  }

  cargarDatos(){
  	this.db.getVentasStatus("pago pendiente").then( (resp)=>{ 
    //  console.log("getVentasProdPendientes 1: ", resp)
    this.ventasPendientes =  resp });
  	this.db.getVentasStatus("pagado").then( (resp)=>{ this.ventasFinalizadas =  resp });
  	
    this.db.getVentasProdListStatus("pago pendiente").then( (resp)=>{ this.ventasPendientesCarrousel =  resp });
    this.db.getVentasProdListStatus("pagado").then( (resp)=>{ this.ventasFinalizadasCarrousel =  resp });
  	//console.log("getVentasProdPendientes: ", this.ventasPendientesCarrousel);

  }

 

  verGraficas(event) {
  	console.log(event)
  	if(event.value != "segment_grap"){
  		this.showGraficas = false;
  		return;
		}
  	this.showGraficas = true;
  	setTimeout(()=>{    
  		this.graficasChart = new Chart(this.graficasCanvas.nativeElement, {
  					type: 'pie',
				    options: { 
				            legend: {
				            		position:"left",				            		
				                labels: {
				                	usePointStyle: true,
				                	fontColor: '#2e61b2'
				                }
				            },
				    },  					
            data: {
                labels: ["Pendientes", "Finalizadas"],
                datasets: [{
                    label: '# of Votes',
                    data: [this.ventasPendientes, this.ventasFinalizadas],
                    backgroundColor: [
                        'rgba(31, 155, 20, 0.8)',
                        'rgba(187, 209, 186, 0.8)'                       
                    ],
                    hoverBackgroundColor: [
                        "#4bcc51",
                        "#d7ead8"
                    ]
                }]
            }  		
  		});
  	}, 100);
  }
//test 2
  verVentasProd(idProducto){
    
    this.db.test_getProdOne(idProducto).then( (resp)=>{ 
    	//console.log("test_getProdOne resp::", resp)
    	this.producto =  resp 
    	console.log("verVentasProd::", this.producto[0].idProducto)
	    let modal = this.modalCtrl.create(DetalleVentasProdPage, { producto: this.producto[0] });
	    
			modal.onDidDismiss( data => {
			 //si se completo una venta se actualiza el listado de las ventas 
			 if (data) {
			    this.cargarDatos();			     
			 }
	    });

	    modal.present();    	
    });
    //


  }  

	abrirPagina(pagina:any){
	 	
		this.navCtrl.push(pagina)
		//this.changePage.emit(pagina)

	}

 
}
