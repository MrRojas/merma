import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MermasPage } from './mermas.page';

const routes: Routes = [
  {
    path: '',
    component: MermasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MermasPageRoutingModule {}
