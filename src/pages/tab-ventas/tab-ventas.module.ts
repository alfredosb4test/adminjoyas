import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabVentasPage } from './tab-ventas';

@NgModule({
  declarations: [
    TabVentasPage,
  ],
  imports: [
    IonicPageModule.forChild(TabVentasPage),
  ],
})
export class TabVentasPageModule {}
