import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyStep2Page } from './buy-step2.page';

const routes: Routes = [
  {
    path: '',
    component: BuyStep2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyStep2PageRoutingModule {}
