import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController, Events } from 'ionic-angular';
import { map } from 'rxjs/operator/map';
/*
  Generated class for the ProductProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProductProvider {
  url: any = 'http://sereenapp.com?route=api2'
  constructor(public http: HttpClient, public toastCtrl: ToastController, public event: Events) {
    console.log('Hello ProductProvider Provider');
  }
  /*
  Get all product category
  */
  getcategory() {
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
  searchProduct(catId, subcatId, pageno, limit) {
    let data = new FormData()
    data.append('search', '');
    data.append('category_id', catId);
    data.append('sub_category', subcatId);
    data.append('sort', 'p.sort_order');
    data.append('order', 'ASC');
    data.append('page', pageno);
    data.append('limit', limit);

    return fetch(this.url + '/product/search', {
      method: "POST",
      body: data
    }).then(response => response.json()).catch(error => {
      console.log(error);
    })
  }

  /*
  Get product detail
  */
  productdetail(prodid) {
    let data = new FormData()
    data.append('product_id', prodid);
    return fetch(this.url + '/product', {
      method: "POST",
      body: data
    }).then(response => response.json()).catch(error => {
      console.log(error);
    })
  }

  /*
 add product in cart
 */
  addtocart(prodid, qnt) {
    let data = new FormData()
    data.append('product_id', prodid);
    data.append('quantity', qnt);
    return fetch(this.url + '/cart/add', {
      method: "POST",
      body: data,
      credentials: 'include'
    }).then(response => response.json()).catch(error => {
      console.log(error);
    })
  }

  /*
  Get cart item detail
  */

  getcartitem() {
    return fetch(this.url + '/cart/products', {
      method: "GET",
      credentials: 'include'
    }).then(response => response.json()).catch(error => {
      console.log(error);
    })
    //return this.http.get(this.url + '/cart/products');
  }

  /*
  Update cart item
  */
  updatecart(prodid,qnt) {
    let data = new FormData()
    data.append('key', prodid);
    data.append('quantity', qnt);
    return fetch(this.url + '/cart/edit', {
      method: "POST",
      body: data,
      credentials: 'include'
    }).then(response => response.json()).catch(error => {
      console.log(error);
    })
  }

  /*
  Remove cart item from list
  */
 removecartitem(prodid){
  let data = new FormData()
  data.append('key', prodid);
  return fetch(this.url + '/cart/remove', {
    method: "POST",
    body: data,
    credentials: 'include'
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
