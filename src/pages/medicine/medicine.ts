import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { ProductPage } from '../product/product';
import { trigger, style, animate, transition } from '@angular/animations';
import { ProductProvider } from '../../providers/product/product';
import { CartPage } from '../cart/cart';

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
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateX(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class MedicinePage {
  subcategory: any;
  cartitems: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public productPro: ProductProvider, public event: Events) {
    this.subcategory = this.navParams.get('subcat');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad MedicinePage');
    console.log(this.navParams.get('subcat'));
    this.GetCartItem();

  }
  product(catid,sibcatid) {
    console.log(catid+'_'+sibcatid);
    var passdata = {
      categoryid:catid,
      subCategoryid:sibcatid
    }
    this.navCtrl.push(ProductPage,{catdetail:passdata});
  }
  GetCartItem(){
    if(localStorage.getItem('currentUser')){
      this.productPro.getcartitem().then(response => {
        console.log(response);
        //alert(JSON.stringify(response));
        this.cartitems = response.products.length;
      }, error => {
        console.log(error);
        this.productPro.presentToast('Something went wrong!!!', 4500, 'bottom');
        //alert('Something went wrong!!!');
      })
    }else{
      this.productPro.presentToast('Please login to get cart item', 4500, 'bottom');
    }
  }
  cart() {
    this.navCtrl.push(CartPage);
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.GetCartItem();
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
}
