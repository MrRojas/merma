import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProveedorPageRoutingModule } from './edit-proveedor-routing.module';

import { EditProveedorPage } from './edit-proveedor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditProveedorPageRoutingModule
  ],
  declarations: [EditProveedorPage]
})
export class EditProveedorPageModule {}
