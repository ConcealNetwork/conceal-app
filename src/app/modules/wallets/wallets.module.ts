import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdkTableModule } from '@angular/cdk/table';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { SharedModule } from 'src/app/shared.module';
import { WalletsRoutingModule } from './wallets-routing.module';
import { WalletsComponent } from './wallets.component';

// Dialogs
import { SendDialog } from "./dialogs/send/send.component";
import { ReceiveDialog } from "./dialogs/receive/receive.component";
import { ExportDialog } from './dialogs/export/export.component';
import { QrcodeDialog } from './dialogs/qrcode/qrcode.component';


@NgModule({
  declarations: [
    WalletsComponent,
		SendDialog,
		ReceiveDialog,
		ExportDialog,
  	QrcodeDialog
  ],
  imports: [
		FormsModule,
    ReactiveFormsModule,
		MatAutocompleteModule,
		MatButtonModule,
		MatInputModule,
		MatCardModule,
		MatIconModule,
		MatMenuModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		CdkTableModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
    WalletsRoutingModule,
		MatDialogModule,
		MatSelectModule,
		MatSlideToggleModule,
		SharedModule
  ]
})
export class WalletModule { }
