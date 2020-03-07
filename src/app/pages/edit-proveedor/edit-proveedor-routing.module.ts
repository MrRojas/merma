import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditProveedorPage } from './edit-proveedor.page';

const routes: Routes = [
  {
    path: '',
    component: EditProveedorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditProveedorPageRoutingModule {}
