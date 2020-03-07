import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyStep3Page } from './buy-step3.page';

const routes: Routes = [
  {
    path: '',
    component: BuyStep3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyStep3PageRoutingModule {}
