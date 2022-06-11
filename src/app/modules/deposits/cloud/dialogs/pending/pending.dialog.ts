// Angular Core
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.dialog.html',
  styleUrls: ['./pending.dialog.scss']
})

export class PendingDialog {

	constructor (
		public dialogRef: MatDialogRef<PendingDialog>,
		@Inject(MAT_DIALOG_DATA) public data: any,
	) {	}


	close() {
		this.dialogRef.close(true);
	}

}
