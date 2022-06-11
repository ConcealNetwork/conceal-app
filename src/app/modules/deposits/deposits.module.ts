import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
		FormsModule,
    ReactiveFormsModule,
  ]
})
export class DepositsModule { }
