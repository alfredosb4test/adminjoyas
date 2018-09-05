import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NuevoClientePage } from './nuevo-cliente';

@NgModule({
  declarations: [
    NuevoClientePage,
  ],
  imports: [
    IonicPageModule.forChild(NuevoClientePage),
  ],
})
export class NuevoClientePageModule {}
