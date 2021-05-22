import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayRoutingModule } from './pay-routing.module';
import { PayComponent } from './pay.component';


@NgModule({
  declarations: [
    PayComponent
  ],
  imports: [
    CommonModule,
    PayRoutingModule
  ]
})
export class PayModule { }
