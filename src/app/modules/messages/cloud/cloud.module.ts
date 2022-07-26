import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared.module';
import { MaterialModule } from 'src/app/material.module';

import { CloudRoutingModule } from './cloud-routing.module';
import { CloudComponent } from './cloud.component';

import { ComposeDialog } from './dialogs/compose/compose.component';


@NgModule({
  declarations: [
    CloudComponent,
		ComposeDialog,
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
