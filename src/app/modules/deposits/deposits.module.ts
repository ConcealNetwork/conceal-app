import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepositsRoutingModule } from './deposits-routing.module';
import { DepositsComponent } from './deposits.component';


@NgModule({
  declarations: [
    DepositsComponent
  ],
  imports: [
    CommonModule,
    DepositsRoutingModule
  ]
})
export class DepositsModule { }
