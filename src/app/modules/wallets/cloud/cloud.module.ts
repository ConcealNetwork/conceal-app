import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QRCodeModule } from 'angularx-qrcode';

import { SharedModule } from 'src/app/shared.module';
import { MaterialModule } from 'src/app/material.module';

import { CloudRoutingModule } from './cloud-routing.module';
import { CloudComponent } from './cloud.component';

// Dialogs
import { SendDialog } from "./dialogs/send/send.component";
import { ReceiveDialog } from "./dialogs/receive/receive.component";
import { ExportDialog } from './dialogs/export/export.component';
import { CodeDialog } from './dialogs/code/code.component';

@NgModule({
  declarations: [
    CloudComponent,
		SendDialog,
		ReceiveDialog,
		ExportDialog,
  	CodeDialog,
  ],
  imports: [
		FormsModule,
    ReactiveFormsModule,
    CloudRoutingModule,
		SharedModule,
		MaterialModule,
		QRCodeModule
  ]
})
export class CloudModule { }
