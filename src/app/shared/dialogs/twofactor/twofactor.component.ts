// Angular
import { Component, Inject } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Dialogs
@Component({
  selector: 'twofa',
  templateUrl: 'twofactor.component.html',
	styleUrls: ['./twofactor.component.scss'],
	animations: [
		trigger('transition', [
			transition(':enter', [
				style({ opacity: 0}),
				animate('0.3s ease-in', style({ opacity: 1}))
			])
		])
	]
})

export class TwoFactorDialog {

	constructor (
		public dialogRef: MatDialogRef<TwoFactorDialog>, @Inject(MAT_DIALOG_DATA) public data: any
	) {	}

	close() {
		this.dialogRef.close(true);
	}

}