import { DeliveryAddressPage } from './../delivery-address/delivery-address';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BillingDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-billing-detail',
  templateUrl: 'billing-detail.html',
})
export class BillingDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BillingDetailPage');
  }
  delivery_address(){
    this.navCtrl.push('DeliveryAddressPage');
  }

}
