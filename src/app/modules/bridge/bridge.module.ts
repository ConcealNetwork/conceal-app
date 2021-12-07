import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';

import { BridgeRoutingModule } from './bridge-routing.module';
import { BridgeComponent } from './bridge.component';


@NgModule({
  declarations: [
    BridgeComponent
  ],
  imports: [
		SharedModule,
    BridgeRoutingModule
  ]
})
export class BridgeModule { }
