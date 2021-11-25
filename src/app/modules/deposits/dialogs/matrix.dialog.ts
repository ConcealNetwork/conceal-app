// Angular Core
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface InterestMatrix {
  month: number;
  tier1: number;
  tier2: number;
  tier3: number;
}

const ELEMENT_DATA: InterestMatrix[] = [
  {month: 1, tier1: 0.24, tier2: 0.33, tier3: 0.41},
  {month: 2, tier1: 0.50, tier2: 0.67, tier3: 0.83},
  {month: 3, tier1: 0.78, tier2: 1.03, tier3: 1.28},
  {month: 4, tier1: 1.07, tier2: 1.40, tier3: 1.73},
  {month: 5, tier1: 1.38, tier2: 1.79, tier3: 2.21},
  {month: 6, tier1: 1.70, tier2: 2.20, tier3: 4.70},
  {month: 7, tier1: 2.04, tier2: 2.63, tier3: 3.21},
  {month: 8, tier1: 2.40, tier2: 3.07, tier3: 3.73},
  {month: 9, tier1: 2.78, tier2: 3.53, tier3: 4.28},
  {month: 10, tier1: 3.17, tier2: 4.00, tier3: 4.83},
  {month: 11, tier1: 3.58, tier2: 4.49, tier3: 5.41},
  {month: 12, tier1: 4.00, tier2: 5.00, tier3: 6.00},
];

// Dialogs
@Component({
  selector: 'matrix',
  templateUrl: 'matrix.dialog.html',
	styleUrls: ['./matrix.dialog.scss']
})

export class MatrixDialog {

	displayedColumns: string[] = ['month', 'tier1', 'tier2', 'tier3'];
  dataSource = ELEMENT_DATA;

	constructor (
		public dialogRef: MatDialogRef<MatrixDialog>,
		@Inject(MAT_DIALOG_DATA) public data: any,
	) {}

	close() {
		this.dialogRef.close(true);
	}

}