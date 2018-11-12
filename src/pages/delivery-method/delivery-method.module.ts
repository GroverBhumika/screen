import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DeliveryMethodPage } from './delivery-method';

@NgModule({
  declarations: [
    DeliveryMethodPage,
  ],
  imports: [
    IonicPageModule.forChild(DeliveryMethodPage),
  ],
})
export class DeliveryMethodPageModule {}
