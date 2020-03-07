import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ListBuyPageRoutingModule } from './list-buy-routing.module';

import { ListBuyPage } from './list-buy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListBuyPageRoutingModule, 
     NgxDatatableModule
  ],
  declarations: [ListBuyPage]
})
export class ListBuyPageModule {}
