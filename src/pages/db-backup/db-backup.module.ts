import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DbBackupPage } from './db-backup';

@NgModule({
  declarations: [
    DbBackupPage,
  ],
  imports: [
    IonicPageModule.forChild(DbBackupPage),
  ],
})
export class DbBackupPageModule {}
