import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';

/**
 * Generated class for the ProductdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productdetail',
  templateUrl: 'productdetail.html',
})
export class ProductdetailPage {
  detail: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,public productPro:ProductProvider) {
    console.log('product id:'+this.navParams.get('product_id'));
    let product_id = this.navParams.get('product_id');
     this.productPro.productdetail(product_id).then(response=>{
       console.log(response);
       this.detail = response;
     },error=>{
       console.log(error);
       this.productPro.presentToast('Something went wrong!!!',4500,'bottom');
     })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductdetailPage');
 
  }

}
