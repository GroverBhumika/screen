
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController) {

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
  productdetail(){
    this.navCtrl.push('ProductdetailPage');
  }
  billing_detail(){
    this.navCtrl.push('BillingDetailPage');
  }

}
