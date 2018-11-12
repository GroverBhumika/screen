import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { map } from 'rxjs/operator/map';
/*
  Generated class for the ProductProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductProvider {
  url: any = 'http://sereenapp.com/?route=api2'
  constructor(public http: HttpClient, public toastCtrl: ToastController) {
    console.log('Hello ProductProvider Provider');
  }
/*
Get all product category
*/
getcategory(){
  return fetch(this.url + '/category/all', {
    method: "GET",
   // body: data
  }).then(response => response.json()).catch(error => {
    console.log(error);
  })
}
/*
Search product
*/
searchProduct(){
  return fetch(this.url + '/category/all', {
    method: "POST",
    body: data
  }).then(response => response.json()).catch(error => {
    console.log(error);
  })
}
  /*
  common toast function
  */
 presentToast(msg, duration, position) {
  let toast = this.toastCtrl.create({
    message: msg,
    duration: duration,
    position: position
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present();
}
}
