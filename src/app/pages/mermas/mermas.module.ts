import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MermasPageRoutingModule } from './mermas-routing.module';

import { MermasPage } from './mermas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MermasPageRoutingModule
  ],
  declarations: [MermasPage]
})
export class MermasPageModule {}
