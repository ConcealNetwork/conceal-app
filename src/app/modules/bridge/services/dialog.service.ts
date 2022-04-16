// Angular Core
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// Dialog Components
import { HelpDialog } from "../dialogs/help.component";
import { MetaMaskDialog } from "../dialogs/metamask.component";
import { TransactionDialog } from "../dialogs/transaction.component";

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

	closeDialogs(): void {
		 this.dialog.closeAll();
	}

}