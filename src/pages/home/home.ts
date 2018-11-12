
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { MedicinePage } from '../medicine/medicine';
import { trigger, style, animate, transition } from '@angular/animations';

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
  templateUrl: 'home.html',
})
export class HomePage {
  category: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public productPro:ProductProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.productPro.getcategory().then(res=>{
     console.log(res);
     this.category = res.categories;
    }).catch(error=>{
      console.log(error);
    })
  }

  cart(){
    this.navCtrl.push('CartPage');
  }
  selected(events){
    console.log(events);
  this.navCtrl.push(MedicinePage,{subcat:events});
}

}
