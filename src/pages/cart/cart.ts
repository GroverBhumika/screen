
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';

/**
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  items: any = [];
  data: any = [];
  cartitems: any = [];
  totalprice: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public productPro: ProductProvider) {
    // this.items = [{ 'name': 'Jos-Pan Syrup 100ml', 'thumb': 'assets/imgs/product.png', 'price': 'SR 145' }, { 'name': 'Jos-Pan Syrup 100ml', 'thumb': 'assets/imgs/product.png', 'price': 'RS 145' }, { 'name': 'Jos-Pan Syrup 100ml', 'thumb': 'assets/imgs/product.png', 'price': 'RS 145' }]
    // this.items.forEach((element, key) => {
    //   console.log(element);
    //   console.log(key);
    //   this.data[key] = 1;
    // });
    this.GetCartItem();
  }
  GetCartItem() {
    if (localStorage.getItem('currentUser')) {
      this.productPro.getcartitem().then(response => {
        console.log(response);
        response.products.forEach((element, key) => {
          console.log(element);
          console.log(key);
          this.data[key] = element.quantity;
        });
        this.totalprice = response.totals[1].text;
        this.cartitems = response;
        
      }, error => {
        console.log(error);
        this.productPro.presentToast('Something went wrong!!!', 4500, 'bottom');
        //alert('Something went wrong!!!');
      })
    } else {
      this.productPro.presentToast('Please login to get cart item', 4500, 'bottom');
    }
  }
  alert1() {
    const prompt = this.alertCtrl.create({
      title: 'Check Out',
      message: " Proceed to check-out",

      buttons: [
        {
          text: 'No',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: data => {
            this.billing_detail();
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }
  productdetail() {
    this.navCtrl.push('ProductdetailPage');
  }
  billing_detail() {
    this.navCtrl.push('BillingDetailPage');
  }
  increment(index,id): void {
    console.log(index);
    console.log(id);
    console.log(this.data);
    console.log(this.data[index]);
    this.data[index] = parseInt(this.data[index]) + 1;
    console.log(this.data);
    let qnt = parseInt(this.data[index]);
    console.log(qnt);
    this.productPro.updatecart(id,qnt).then(response => {
      console.log(response);
      this.GetCartItem();
    }, error => {
      console.log(error);
      this.productPro.presentToast('Something went wrong!!!', 4500, 'bottom');
      //alert('Something went wrong!!!');
    })
  }
  decrement(index,id): void {
    console.log(index);
    console.log(id);
    console.log(this.data);
    console.log(this.data[index]);
    if (parseInt(this.data[index]) > 1) {
      this.data[index] = parseInt(this.data[index]) - 1;
      let qnt = parseInt(this.data[index]);
      console.log(qnt);
      this.productPro.updatecart(id,qnt).then(response => {
        console.log(response);
        this.GetCartItem();
      }, error => {
        console.log(error);
        this.productPro.presentToast('Something went wrong!!!', 4500, 'bottom');
        //alert('Something went wrong!!!');
      })
    }
 
  }
  removeitem(index: number,id): void {
    console.log(index);
    console.log(this.items);
    console.log(this.data);
    this.items.splice(index, 1);
    this.data.splice(index, 1);
    console.log(this.items);
    console.log(this.data);
     this.productPro.removecartitem(id).then(response => {
      console.log(response);
      this.GetCartItem();
    }, error => {
      console.log(error);
      this.productPro.presentToast('Something went wrong!!!', 4500, 'bottom');
      //alert('Something went wrong!!!');
    })
  }
}
