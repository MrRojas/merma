import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuyStep1PageRoutingModule } from './buy-step1-routing.module';

import { BuyStep1Page } from './buy-step1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuyStep1PageRoutingModule
  ],
  declarations: [BuyStep1Page]
})
export class BuyStep1PageModule {}
