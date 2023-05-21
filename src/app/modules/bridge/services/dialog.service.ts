// Angular Core
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// Dialog Components
import { HelpDialog } from "../dialogs/help.component";
import { MetaMaskDialog } from "../dialogs/metamask.component";
import { TransactionDialog } from "../dialogs/transaction.component";
//import { SendDialog } from 'src/app/modules/wallets/cloud/dialogs/send/send.component';

@Injectable({
	providedIn: 'root'
})

export class DialogService {

	constructor (
		public dialog: MatDialog
	) { }

	openHelpDialog(): void {
		const dialogRef = this.dialog.open(HelpDialog, {
			width: 'auto',
			height: 'auto',
		})
		dialogRef.afterClosed().subscribe(result => { })
  }

	openMetaMaskDialog(): void {
		const dialogRef = this.dialog.open(MetaMaskDialog, {
			width: 'auto',
			height: 'auto',
			disableClose: true
		})
		dialogRef.afterClosed().subscribe(result => { })
  }

	openTransactionDialog(): void {
		const dialogRef = this.dialog.open(TransactionDialog, {
			width: 'auto',
			height: 'auto',
			disableClose: true
		})
		dialogRef.afterClosed().subscribe(result => { })
  }

	// openSendDialog(wallet:any, address?: string, payment?: string, amount?: string): void {
	// 	const dialogRef = this.dialog.open(SendDialog, {
	// 		width: 'auto',
	// 		height: 'auto',
	// 		disableClose: true,
	// 		data: {
	// 			wallet: wallet,
	// 			address: address,
	// 			payment: payment,
	// 			amount: amount
	// 		}
	// 	})
	// 	dialogRef.afterClosed().subscribe(result => { })
  // }

	closeDialogs(): void {
		 this.dialog.closeAll();
	}

}