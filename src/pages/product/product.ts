import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
    console.log(this.navParams.get('catdetail'));
  }

  productdetail(){
    this.navCtrl.push('ProductdetailPage');
  }
  cart(){
    this.navCtrl.push('CartPage');
  }

  add(){
    this.navCtrl.push('AddproductPage');
  }


}
