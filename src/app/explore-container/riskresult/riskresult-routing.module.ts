import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RiskresultPage } from './riskresult.page';

const routes: Routes = [
  {
    path: '',
    component: RiskresultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RiskresultPageRoutingModule {}
