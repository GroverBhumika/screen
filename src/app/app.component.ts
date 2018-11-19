import { LoginPage } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Icon, Img, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ProductPage } from '../pages/product/product';
import { HomePage } from '../pages/home/home';
import { HistoryPage } from '../pages/history/history';
import { CartPage } from '../pages/cart/cart';
import { UserProvider } from '../providers/user/user';
import { TranslateService } from '@ngx-translate/core';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any, icon: string }>;
  rootPage: any;
  currentUser: any = {};
  loggedin: boolean;
  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public event: Events,
    public userPro: UserProvider, public translate: TranslateService, ) {
    this.initializeApp();
    this.event.subscribe('loggedin', () => {
      this.loggedin = true;
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('Welcome loggedin');
      if (localStorage.getItem('language')) {
        console.log(localStorage.getItem('language'))
        this.changeLanguage(localStorage.getItem('language'));
      }
      this.pages = [
        { title: 'New Products', component: ProductPage, icon: 'assets/imgs/product1.png' },
        { title: 'My Order', component: HistoryPage, icon: 'assets/imgs/order.png' },
        { title: 'Order By Category', component: HomePage, icon: 'assets/imgs/order_category.png' },
        { title: 'Cart', component: CartPage, icon: 'assets/imgs/cart.png' },
        { title: 'Contact Us', component: HomePage, icon: 'assets/imgs/contact.png' }
      ];
    });
    this.event.subscribe('skip', () => {
      this.loggedin = false;
      // user and time are the same arguments passed in `events.publish(user, time)`
      console.log('Welcome guest');
      console.log(this.currentUser);
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      statusBar.overlaysWebView(false);
      statusBar.backgroundColorByHexString('#87be46');
      splashScreen.hide();
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (localStorage.getItem('currentUser')) {
        this.loggedin = true;
        this.event.publish('loggedin', 'loggedin');
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        console.log(this.currentUser);
        // used for an example of ngFor and navigation
        this.pages = [
          { title: 'New Products', component: ProductPage, icon: 'assets/imgs/product1.png' },
          { title: 'My Order', component: HistoryPage, icon: 'assets/imgs/order.png' },
          { title: 'Order By Category', component: HomePage, icon: 'assets/imgs/order_category.png' },
          { title: 'Cart', component: CartPage, icon: 'assets/imgs/cart.png' },
          { title: 'Contact Us', component: HomePage, icon: 'assets/imgs/contact.png' }
        ];
        this.rootPage = HomePage;
      } else {
        console.log('language');
        if (localStorage.getItem('language')) {
          console.log(localStorage.getItem('language'))
          this.changeLanguage(localStorage.getItem('language'));
        }
        this.loggedin = false;
        this.rootPage = LoginPage;
      }
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    localStorage.clear();
    this.nav.setRoot(LoginPage);
  }
  login() {
    this.nav.setRoot(LoginPage);
  }

  changeLanguage(language) {
    console.log(language);
    localStorage.setItem('language', language);
    if (language == "ar") {
      // this.platform.setDir('rtl', true);
      this.translate.setDefaultLang(language);
      this.translate.use(language);
    } else {
      //  this.platform.setDir('ltr', true);
      this.translate.setDefaultLang(language);
      this.translate.use(language);
    }
    // this.translate.setDefaultLang(language);
    // this.translate.use(language);
    this.userPro.changelanguage(language).then(response => {
      console.log(response);

    }, error => {
      console.log(error);
      this.userPro.presentToast('Something went wrong!!!', 4500, 'bottom');
    })
  }

}
