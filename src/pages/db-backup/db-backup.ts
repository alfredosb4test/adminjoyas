import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { DatabaseProvider } from '../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-db-backup',
  templateUrl: 'db-backup.html',
})
export class DbBackupPage {

  constructor(public navCtrl: NavController, 
  					  public navParams: NavParams,
  					  public http: HttpClient) {
  	this.getRemoteData();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DbBackupPage');
  }

	getRemoteData(){
	    this.http.get('https://www.reddit.com/r/gifs/top/.json?limit=105sort=hot').subscribe(data => {
	        console.log(data);
	    });
	}

}
