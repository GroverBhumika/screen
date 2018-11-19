import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { PipesModule } from '../../pipes/pipes.module';
import { TranslateModule} from "@ngx-translate/core";

@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    PipesModule,
    TranslateModule.forChild()
  ],
})
export class HomePageModule {
  constructor(public translatemodule: TranslateModule){  
  }
}
