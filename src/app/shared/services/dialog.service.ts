// Angular Core
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// Dialog Components
import { TwoFactorDialog } from '../dialogs/twofactor.component';

@Injectable({
	providedIn: 'root'
})

export class DialogService {

	constructor (
		public dialog: MatDialog
	) { }

	openTwoFactorDialog(): void {
		const dialogRef = this.dialog.open(TwoFactorDialog, {
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