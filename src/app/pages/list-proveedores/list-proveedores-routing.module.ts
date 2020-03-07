import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListProveedoresPage } from './list-proveedores.page';

const routes: Routes = [
  {
    path: '',
    component: ListProveedoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListProveedoresPageRoutingModule {}
