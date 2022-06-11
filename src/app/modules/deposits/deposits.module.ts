import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared.module';
import { MaterialModule } from 'src/app/material.module';

import { DepositsRoutingModule } from './deposits-routing.module';
import { DepositsComponent } from './deposits.component';

@NgModule({
  declarations: [
    DepositsComponent,
  ],
  imports: [
    DepositsRoutingModule,
		SharedModule,
		MaterialModule,
  ]
})
export class DepositsModule { }
