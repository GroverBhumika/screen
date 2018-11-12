
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductPage } from '../product/product';

/**
 * Generated class for the MedicinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-medicine',
  templateUrl: 'medicine.html',
})
export class MedicinePage {
  subcategory: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.subcategory = this.navParams.get('subcat');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicinePage');
    console.log(this.navParams.get('subcat'));

  }
  product(catid,sibcatid) {
    console.log(catid+'_'+sibcatid);
    var passdata = {
      categoryid:catid,
      subCategoryid:sibcatid
    }
    this.navCtrl.push(ProductPage,{catdetail:passdata});
  }
  cart() {
    this.navCtrl.push('CartPage');
  }

}
