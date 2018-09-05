import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCategoriaPage } from './add-categoria';

@NgModule({
  declarations: [
    AddCategoriaPage,
  ],
  imports: [
    IonicPageModule.forChild(AddCategoriaPage),
  ],
})
export class AddCategoriaPageModule {}
