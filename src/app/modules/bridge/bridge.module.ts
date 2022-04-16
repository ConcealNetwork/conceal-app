import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BridgeRoutingModule } from './bridge-routing.module';
import { BridgeComponent } from './bridge.component';
import { CcxSwapComponent } from './components/ccx/ccx.component';
import { EthSwapComponent } from './components/eth/eth.component';
import { BscSwapComponent } from './components/bsc/bsc.component';
import { PlgSwapComponent } from './components/plg/plg.component';

// Shared
import { NumericDirective } from "./directive/numeric.directive";
import { HelpDialog } from "./dialogs/help.component";
import { MetaMaskDialog } from "./dialogs/metamask.component";
import { TransactionDialog } from "./dialogs/transaction.component";

// Services
import { DataService } from './services/data.service';
import { DialogService } from './services/dialog.service';
import { SnackbarService } from './services/snackbar.service';
import { APIService } from './services/api.service';
import { EthersService } from './services/ethers.service';

@NgModule({
  declarations: [
    BridgeComponent,
		CcxSwapComponent,
		EthSwapComponent,
		BscSwapComponent,
		PlgSwapComponent,
		HelpDialog,
		MetaMaskDialog,
		TransactionDialog,
		NumericDirective
  ],
  imports: [
		SharedModule,
    BridgeRoutingModule,
		MaterialModule,
		FormsModule,
		ReactiveFormsModule
  ],
	providers: [
		DialogService,
		SnackbarService,
		APIService,
		EthersService,
		DataService
  ],
})
export class BridgeModule { }
