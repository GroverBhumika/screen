import { LoginPage } from './../pages/login/login';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePageModule } from '../pages/home/home.module';
import { UserProvider } from '../providers/user/user';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ProductProvider } from '../providers/product/product';
import { MedicinePage } from '../pages/medicine/medicine';
import { HistoryPage } from '../pages/history/history';
import { ProductPage } from '../pages/product/product';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductdetailPage } from '../pages/productdetail/productdetail';
import { PipesModule } from '../pipes/pipes.module';
import { CartPage } from '../pages/cart/cart';

import { TranslateModule, TranslateLoader} from '@ngx-translate/core';
import { TranslateHttpLoader} from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    MyApp,
    ListPage,
    LoginPage,
    MedicinePage,
    HistoryPage,
    ProductPage,
    ProductdetailPage,
    CartPage

  ],
  imports: [
    BrowserModule,
    HomePageModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    PipesModule,
    IonicModule.forRoot(MyApp),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: (HttpLoaderFactory),
          deps: [HttpClient]
      }
  }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    LoginPage,
    MedicinePage,
    HistoryPage,
    ProductPage,
    ProductdetailPage,
    CartPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserProvider,
    ProductProvider,
    
  ]
})
export class AppModule { }
