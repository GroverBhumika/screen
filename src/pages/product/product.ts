import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController,Events } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { ProductdetailPage } from '../productdetail/productdetail';
import { trigger, style, animate, transition } from '@angular/animations';
import { CartPage } from '../cart/cart';

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
  ]
})
export class ProductPage {
  detail: any;
  products: any = [];
  pageno: number = 1;
  cartitems: any;
  constructor(public navCtrl: NavController,public toastCtrl:ToastController,public events:Events, public navParams: NavParams, public productPro: ProductProvider) {
    this.GetCartItem();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
    console.log(this.navParams.get('catdetail'));
    this.loadProduct(this.pageno);
    
  }
  loadProduct(pageno) {
    this.detail = this.navParams.get('catdetail');
    this.productPro.searchProduct(this.detail.categoryid, this.detail.subCategoryid, pageno, 10).then(response => {
      console.log(response);
      response.products.forEach(value => {
        // console.log(value);
        this.products.push(value);

        // console.log(this.products);
      });
    }, error => {
      console.log(error);
      this.productPro.presentToast('Something went wrong!!!', 4500, 'bottom');
    })
  }
  productdetail(id) {
    console.log(id);
    this.navCtrl.push(ProductdetailPage, { product_id: id });
  }
  cart() {
    this.navCtrl.push(CartPage);
  }

  addCart(event) {
    console.log(event);
    if(localStorage.getItem('currentUser')){
      this.productPro.addtocart(event.product_id,1).then(response => {
        console.log(response);
        this.GetCartItem();
       // alert(response.success);
      }, error => {
        console.log(error);
        this.productPro.presentToast('Something went wrong!!!', 4500, 'bottom');
        alert('Something went wrong!!!');
      })
    }else{
      this.presentToast('Please login to add product in cart',4500,'bottom');
    }
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
      this.presentToast('Please login to get cart item',4500,'bottom');
    }
  }

  doInfinite(infiniteScroll) {
    console.log('Begin async operation');
    this.pageno = this.pageno + 1;
    this.loadProduct(this.pageno);
    setTimeout(() => {
      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  presentToast(msg, duration, position) {
    let toast = this.toastCtrl.create({
      message: msg,
     // duration: duration,
      position: position,
      showCloseButton:true,
      closeButtonText:'OK'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
    toast.present();
  }
}
