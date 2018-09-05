import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Producto } from '../../../interfaces/producto.interface';
 
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-editar-producto',
  templateUrl: 'editar-producto.html',
})
export class EditarProductoPage {
	test_productos: Producto;

	bigImg = null;
	bigSize = '0';
	smallImg = null;
	smallSize = '0';

  constructor(public navCtrl: NavController, 
  			  public navParams: NavParams, 
  			  public viewCtrl: ViewController,
  			  private camera: Camera) {

  	this.test_productos = this.navParams.get("data");
  	console.log("EditarProductoPage::", this.test_productos)
  }

  loadImage() {
  	// https://ionicacademy.com/create-thumbnail-image-ionic/
    const options: CameraOptions = {
      quality: 30,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      correctOrientation: true,
      allowEdit: false
    };
 
    this.camera.getPicture(options).then(imageData => {
      let base64data = 'data:image/jpeg;base64,' + imageData;
      this.bigImg = base64data;
      this.bigSize = this.getImageSize(this.bigImg);
    }, err => {
      console.log('gallery error: ', err);
    });
  }

  getImageSize(data_url) {
    var head = 'data:image/jpeg;base64,';
    return ((data_url.length - head.length) * 3 / 4 / (1024*1024)).toFixed(4);
  }  


	closeModal($event) {
		this.viewCtrl.dismiss($event);
	} 


}
