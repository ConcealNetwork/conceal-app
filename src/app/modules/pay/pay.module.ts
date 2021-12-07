import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared.module';
import { PayRoutingModule } from './pay-routing.module';
import { PayComponent } from './pay.component';


@NgModule({
  declarations: [
    PayComponent
  ],
  imports: [
    SharedModule,
    PayRoutingModule
  ]
})
export class PayModule { }
