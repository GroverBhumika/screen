import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operator/map';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {
  url: any = 'http://sereenapp.com/?route=api2'
  constructor(public http: HttpClient, public toastCtrl: ToastController) {
    console.log('Hello UserProvider Provider');
  }

  /*
  User login function
  Call on:login.ts
  */
  Login(formdata) {
    let data = new FormData()
    data.append("email", formdata.email);
    data.append("password", formdata.password);

    return fetch(this.url + '/user_login', {
      method: "POST",
      body: data
    }).then(response => response.json()).catch(error => {
      console.log(error);
    })
  }

  /*
  User register
  Call:signup.ts
  */
  register(formdata) {
    let data = new FormData()
    data.append("firstname", formdata.fname);
    data.append("lastname", formdata.lastname);
    data.append("email", formdata.email);
    data.append("password", formdata.password);
    data.append("confirm", formdata.cpassword);
    data.append("telephone", formdata.phnnumber);
    data.append("address_1", formdata.address);
    data.append("address_2", formdata.addresss);
    data.append("city", formdata.City);
    data.append("postcode", formdata.PostCode);
    data.append("country_id", formdata.ccode);
    data.append("zone_id", formdata.Region);
    data.append("customer_group_id", '');
    data.append("agree", formdata.agree);
    return fetch(this.url + '/user_register', {
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
