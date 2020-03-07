import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuyStep2PageRoutingModule } from './buy-step2-routing.module';

import { BuyStep2Page } from './buy-step2.page';

import { Camera } from '@ionic-native/camera/ngx';

@NgModule({

   providers: [
  
    Camera
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuyStep2PageRoutingModule

  ],
  declarations: [BuyStep2Page]
})
export class BuyStep2PageModule {}
