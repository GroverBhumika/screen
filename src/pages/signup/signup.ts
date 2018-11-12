
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {FormsModule, FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { LoginPage } from '../login/login';
import { UserProvider } from '../../providers/user/user';
import { HomePage } from '../home/home';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  
url=" http://sereenapp.com?route=api2/user_register";

data={
  fname:"",
  lastname:"",
  email:"",
  password:"",
  cpassword:"",
  phnnumber:"",
  Fax:"",
  address:"",
  addresss:"",
  City:"",
  PostCode:"",
  ccode:"",
  agree:true,
  company:"",
  Region:"",
}
  SignupForm: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder,
     private http: Http,public userPro:UserProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  
  }
  ngOnInit(): any {
    console.log('ngOnInit');
    this.SignupForm = this.formBuilder.group({
        fname: ['', [Validators.required]],
        lastname: ['', [Validators.required]],
        phnnumber: ['', [Validators.required]],
        email: ['', [Validators.required, this.emailValidator.bind(this)]],
        password: ['', [Validators.required]],
        cpassword: ['', [Validators.required]],
        address: ['', [Validators.required]],
        addresss: ['', [Validators.required]],
        PostCode: ['', [Validators.required]],
        City: ['', [Validators.required]],
        ccode: ['', [Validators.required]],
        Region: ['', [Validators.required]],
        agree: [true, [Validators.required, this.checkbox.bind(this)]],

    }, {validator: this.matchingPasswords('password', 'cpassword')},
    );

}
emailValidator(control: FormControl): {[s: string]: boolean} {
  if (!(control.value.toLowerCase().match('^[a-z0-9]+(\.[_a-z0-9]+)+([@{1}])+(\.[a-z0-9-]+)+([.{1}])(\.[a-z]{1,15})$'))) {
      return {invalidEmail: true};
  }
}
matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
  return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];
      if (password.value !== confirmPassword.value) {
          return {
              mismatchedPasswords: true
          };
      }
  }
}
isValid(field: string) {
  let formField = this.SignupForm.get(field);

  return formField.valid || formField.pristine;
}
checkbox(agree) {
  console.log(agree.value);
  if (agree.value == false) {
      return {agree: false}
  }

}
  login() {
     this.navCtrl.setRoot(LoginPage);
  }
  submit(data) {
    console.log(data.value);
    if(data.value.agree == true){
      data.value.agree = 1;
    }else{
      data.value.agree = 0;
    }
    this.userPro.register(data.value).then(response => {
      console.log(response);
      if (response.error_warning) {
        return this.userPro.presentToast(response.error_warning, 4500, 'bottom');
      }
      //localStorage.setItem('currentUser', JSON.stringify(response.customer_info));
     // this.navCtrl.setRoot(HomePage);
    }, error => {
      console.log(error);
      return this.userPro.presentToast('Something went wront!!!', 4500, 'bottom');
    })
    // var signupdata = {
    //   firstname: data.value.fname, //data.value
    //   lastname: data.value.lastname,
    //   email: data.value.email,
    //   password: data.value.password,
    //   confirm: data.value.cpassword,
    //   telephone: data.value.phnnumber,
    //   address_1: data.value.address,
    //   address_2: data.value.addresss,
    //   city: data.value.City,
    //   postcode: data.value.PostCode,
    //   country_id: data.value.ccode,
    //   zone_id: data.value.Region,
    //   customer_group_id: "",
    //   agree: data.value.agree,
    // }
    // console.log(signupdata)

    // this.http.post(this.url , signupdata ).map(res => res.json()).subscribe(response => {
    //   console.log(response); 
    // })
    //this.navCtrl.push('HomePage');
  }

}
