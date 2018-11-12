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
import { HttpClientModule } from '@angular/common/http';
import { ProductProvider } from '../providers/product/product';
import { MedicinePage } from '../pages/medicine/medicine';
import { HistoryPage } from '../pages/history/history';
import { ProductPage } from '../pages/product/product';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    MyApp,
    ListPage,
    LoginPage,
    MedicinePage,
    HistoryPage,
    ProductPage

  ],
  imports: [
    BrowserModule,
    HomePageModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    LoginPage,
    MedicinePage,
    HistoryPage,
    ProductPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserProvider,
    ProductProvider
    
  ]
})
export class AppModule { }
