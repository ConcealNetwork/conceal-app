// Angular Core
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

// Dialog Components
import { TwoFactorDialog } from '../dialogs/twofactor/twofactor.component';
import { SendDialog } from '../../modules/wallet/dialogs/send/send.component';
import { ReceiveDialog } from '../../modules/wallet/dialogs/receive/receive.component';

@Injectable({
	providedIn: 'root'
})

export class DialogService {

	width: string = 'auto';
	maxWidth: string = 'auto';
	height: string = 'auto';
	maxHeight: string = 'auto';

	constructor (
		public dialog: MatDialog,
		public breakpointObserver: BreakpointObserver
	) {
		this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
		.subscribe((state: BreakpointState) => {
			if (state.matches) {
				// Matches small viewport or handset in portrait mode
				this.width = '95vw';
				this.maxWidth = '95vw';
			} else {
				this.width = '600px';
				this.maxWidth = '600px';
			}
		});
	 }

	openTwoFactorDialog(): void {
		const dialogRef = this.dialog.open(TwoFactorDialog, {
			width: this.width,
			maxWidth: this.maxWidth,
			height: this.height,
			maxHeight: this.maxHeight,
			disableClose: false
		})
		dialogRef.afterClosed().subscribe(result => { })
  }

	openSendDialog(fromAddress:string): void {
		const dialogRef = this.dialog.open(SendDialog, {
			width: this.width,
			maxWidth: this.maxWidth,
			height: this.height,
			maxHeight: this.maxHeight,
			disableClose: true,
			data: {fromAddress: fromAddress}
		})
		dialogRef.afterClosed().subscribe(result => { })
  }

	openReceiveDialog(): void {
		const dialogRef = this.dialog.open(ReceiveDialog, {
			width: this.width,
			maxWidth: this.maxWidth,
			height: this.height,
			maxHeight: this.maxHeight,
			disableClose: true
		})
		dialogRef.afterClosed().subscribe(result => { })
  }


	closeDialogs(): void {
		 this.dialog.closeAll();
	}

}