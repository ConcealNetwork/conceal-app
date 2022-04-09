// Angular
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'transaction',
  templateUrl: 'transaction.component.html',
	styleUrls: ['./transaction.component.scss'],
})

export class TransactionDialog {

	constructor (
		public dialogRef: MatDialogRef<TransactionDialog>, @Inject(MAT_DIALOG_DATA) public data: any
	) {	}

	close() {
		this.dialogRef.close(true);
	}

}