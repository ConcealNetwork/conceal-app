import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { QRCodeModule } from 'angularx-qrcode';

import { SharedModule } from 'src/app/shared.module';
import { MaterialModule } from 'src/app/material.module';

import { WalletsRoutingModule } from './wallets-routing.module';
import { WalletsComponent } from './wallets.component';

// Dialogs
import { SendDialog } from "./dialogs/send/send.component";
import { ReceiveDialog } from "./dialogs/receive/receive.component";
import { ExportDialog } from './dialogs/export/export.component';
import { CodeDialog } from './dialogs/code/code.component';


@NgModule({
  declarations: [
    WalletsComponent,
		SendDialog,
		ReceiveDialog,
		ExportDialog,
  	CodeDialog
  ],
  imports: [
		FormsModule,
    ReactiveFormsModule,
    WalletsRoutingModule,
		SharedModule,
		MaterialModule,
		QRCodeModule
  ]
})
export class WalletModule { }
