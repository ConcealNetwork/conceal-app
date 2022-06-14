import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared.module';
import { MaterialModule } from 'src/app/material.module';

import { CloudRoutingModule } from './cloud-routing.module';
import { CloudComponent } from './cloud.component';

@NgModule({
  declarations: [
    CloudComponent,
  ],
  imports: [
    CloudRoutingModule,
		SharedModule,
		MaterialModule,
		FormsModule,
    ReactiveFormsModule
  ]
})
export class CloudModule { }
