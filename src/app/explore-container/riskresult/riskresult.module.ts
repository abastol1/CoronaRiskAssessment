import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RiskresultPageRoutingModule } from './riskresult-routing.module';

import { RiskresultPage } from './riskresult.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RiskresultPageRoutingModule
  ],
  declarations: [RiskresultPage]
})
export class RiskresultPageModule {}
