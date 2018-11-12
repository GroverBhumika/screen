
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Events  } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { UserProvider } from '../../providers/user/user';
import { map } from 'rxjs/operator/map';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup
  data = {
    email: "",
    password: ""
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public userPro: UserProvider,
    public events: Events) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  emailValidator(control: FormControl): { [s: string]: boolean } {
    if (!(control.value.toLowerCase().match('^[a-z0-9]+(\.[_a-z0-9]+)+([@{1}])+(\.[a-z0-9-]+)+([.{1}])(\.[a-z]{1,15})$'))) {
      return { invalidEmail: true };
    }
  }
  submit() {
    console.log(this.data);
    this.userPro.Login(this.data).then(response => {
      console.log(response);
      if (response.error_warning) {
        return this.userPro.presentToast(response.error_warning, 4500, 'bottom');
      }
      this.events.publish('loggedin','loggedin');
      localStorage.setItem('currentUser', JSON.stringify(response.customer_info));
      this.navCtrl.setRoot(HomePage);
    }, error => {
      console.log(error);
      return this.userPro.presentToast('Something went wront!!!', 4500, 'bottom');
    })
  }
  skip(){
    this.events.publish('skip','skip');
  }
  forgot() {
    this.navCtrl.setRoot('ForgotPage');
  }

  signup() {
    this.navCtrl.setRoot('SignupPage');
  }

  home() {
    this.navCtrl.setRoot('HomePage');
  }

}
