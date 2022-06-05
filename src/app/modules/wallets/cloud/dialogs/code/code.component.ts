// Angular
import { Component, Inject } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-qrcode',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss'],
	animations: [
		trigger('transition', [
			transition(':enter', [
				style({ opacity: 0}),
				animate('0.3s ease-in', style({ opacity: 1}))
			])
		])
	]
})

export class CodeDialog {

  constructor(
		public dialogRef: MatDialogRef<CodeDialog>, @Inject(MAT_DIALOG_DATA) public data: any
	) {	}

	close() {
		this.dialogRef.close(true);
	}

}
