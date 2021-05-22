import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BridgeRoutingModule } from './bridge-routing.module';
import { BridgeComponent } from './bridge.component';


@NgModule({
  declarations: [
    BridgeComponent
  ],
  imports: [
    CommonModule,
    BridgeRoutingModule
  ]
})
export class BridgeModule { }
