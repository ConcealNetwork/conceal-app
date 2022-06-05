// Angular
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Dialogs
@Component({
  selector: 'receive',
  templateUrl: 'receive.component.html',
	styleUrls: ['./receive.component.scss'],
})

export class ReceiveDialog {

	constructor (
		public dialogRef: MatDialogRef<ReceiveDialog>, @Inject(MAT_DIALOG_DATA) public data: any
	) {	}

	close() {
		this.dialogRef.close(true);
	}

}