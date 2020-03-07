import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuyStep3PageRoutingModule } from './buy-step3-routing.module';

import { BuyStep3Page } from './buy-step3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuyStep3PageRoutingModule
  ],
  declarations: [BuyStep3Page]
})
export class BuyStep3PageModule {}
