import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';

@Component({
  selector: 'frm-add-abono',
  templateUrl: 'frm-add-abono.html'
})
export class FrmAddAbonoComponent {

  chkPago: boolean;
  form: FormGroup;
  errPago:string;
  @Input('idVenta') idVenta:number;
  @Input('restante') restante:number;

  @Output() insertAbono: EventEmitter<boolean> = new EventEmitter();

  constructor(public db: DatabaseProvider, 
  			  private toastCtrl: ToastController,
  			  private _FB: FormBuilder) {
    console.log('Hello FrmAddAbonoComponent Component');
    this.chkPago = false;
  }

  ngOnInit() { 
    this.form = this._FB.group({
      'pagoInicial': ['',Validators.required],
      'nota': [''],
      'pagado': [false]
    });     
  }  

  abono_prod(){
    let abono = this.form.controls['pagoInicial'].value;
    let nota = this.form.controls['nota'].value;
    console.log( "this.restante", this.restante );
    if (this.restante < abono) {
    	this.errPago = 'El abono es mayor que el restante'
    	return;
    }
    this.errPago = '';

	this.db.addAbono(this.idVenta, abono, nota, this.chkPago, this.restante).then((respAbono:any)=>{ 

		this.presentToast('Datos guardados correctamente.');

		console.log( "addAbono", respAbono );
		
		this.form = this._FB.group({
		  'pagoInicial': ['',Validators.required],
		  'nota': [''],
		  'pagado': [false]             
		});
		this.chkPago = false; 
		this.insertAbono.emit(true);

	});  

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
