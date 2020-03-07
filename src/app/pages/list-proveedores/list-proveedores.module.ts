import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListProveedoresPageRoutingModule } from './list-proveedores-routing.module';

import { ListProveedoresPage } from './list-proveedores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListProveedoresPageRoutingModule
  ],
  declarations: [ListProveedoresPage]
})
export class ListProveedoresPageModule {}
