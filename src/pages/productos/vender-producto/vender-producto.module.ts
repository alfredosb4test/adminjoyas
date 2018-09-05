import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VenderProductoPage } from './vender-producto';

@NgModule({
  declarations: [
    VenderProductoPage,
  ],
  imports: [
    IonicPageModule.forChild(VenderProductoPage),
  ],
})
export class VenderProductoPageModule {}
