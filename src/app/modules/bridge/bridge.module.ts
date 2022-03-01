import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BridgeRoutingModule } from './bridge-routing.module';
import { BridgeComponent } from './bridge.component';

import { DataService } from './services/data.service';


@NgModule({
  declarations: [
    BridgeComponent
  ],
  imports: [
		SharedModule,
    BridgeRoutingModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule
  ],
	providers: [
		DataService
  ],
})
export class BridgeModule { }
