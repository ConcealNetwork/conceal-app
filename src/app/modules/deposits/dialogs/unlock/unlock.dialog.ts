// Angular Core
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-unlock',
  templateUrl: './unlock.dialog.html',
  styleUrls: ['./unlock.dialog.scss']
})

export class UnlockDialog {

	constructor (
		public dialogRef: MatDialogRef<UnlockDialog>,
		@Inject(MAT_DIALOG_DATA) public data: any,
	) {	}


	close() {
		this.dialogRef.close(true);
	}

}
