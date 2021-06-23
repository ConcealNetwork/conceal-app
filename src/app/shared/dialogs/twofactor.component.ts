// Angular
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Dialogs
@Component({
  selector: 'twofa',
  templateUrl: 'twofactor.component.html',
	styleUrls: ['./twofactor.component.scss'],
})

export class TwoFactorDialog {

	constructor (
		public dialogRef: MatDialogRef<TwoFactorDialog>, @Inject(MAT_DIALOG_DATA) public data: any
	) {	}

	close() {
		this.dialogRef.close(true);
	}

}