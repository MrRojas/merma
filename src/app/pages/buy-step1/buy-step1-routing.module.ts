import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyStep1Page } from './buy-step1.page';

const routes: Routes = [
  {
    path: '',
    component: BuyStep1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyStep1PageRoutingModule {}
