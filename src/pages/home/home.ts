
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, Events } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { MedicinePage } from '../medicine/medicine';
import { trigger, style, animate, transition } from '@angular/animations';
import { CartPage } from '../cart/cart';
import { TranslateService } from '@ngx-translate/core';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ transform: 'translateX(100%)', opacity: 0 }),
          animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
        ]),
        transition(':leave', [
          style({ transform: 'translateX(0)', opacity: 1 }),
          animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 }))
        ])
      ]
    )
  ],
  templateUrl: 'home.html',
})
export class HomePage {
  category: any;
  cartitems: any;
  constructor(public navCtrl: NavController, public platform: Platform, public event: Events, public navParams: NavParams, public productPro: ProductProvider, public translate: TranslateService) {

  }
  ngOnInit() {
    console.log('home constructor');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.productPro.getcategory().then(res => {
      console.log(res);
      this.category = res.categories;
      this.GetCartItem();
    }).catch(error => {
      console.log(error);
    })

  }
  GetCartItem() {
    if (localStorage.getItem('currentUser')) {
      this.productPro.getcartitem().then(response => {
        console.log(response);
        //alert(JSON.stringify(response));
        this.cartitems = response.products.length;
      }, error => {
        console.log(error);
        this.productPro.presentToast('Something went wrong!!!', 4500, 'bottom');
        //alert('Something went wrong!!!');
      })
    } else {
      this.productPro.presentToast('Please login to get cart item', 4500, 'bottom');
    }
  }
  cart() {
    this.navCtrl.push(CartPage);
  }
  selected(events) {
    console.log(events);
    this.navCtrl.push(MedicinePage, { subcat: events });
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
