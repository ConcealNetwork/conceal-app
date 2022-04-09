// Angular
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Dialogs
@Component({
  selector: 'help',
  templateUrl: 'help.component.html',
	styleUrls: ['./help.component.scss'],
})

export class HelpDialog {

	constructor (
		public dialogRef: MatDialogRef<HelpDialog>, @Inject(MAT_DIALOG_DATA) public data: any
	) {	}

	close() {
		this.dialogRef.close(true);
	}

}