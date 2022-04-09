// Angular
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'metamask',
  templateUrl: 'metamask.component.html',
	styleUrls: ['./metamask.component.scss'],
})

export class MetaMaskDialog {

	constructor (
		public dialogRef: MatDialogRef<MetaMaskDialog>, @Inject(MAT_DIALOG_DATA) public data: any
	) {	}

	close() {
		this.dialogRef.close(true);
	}

}