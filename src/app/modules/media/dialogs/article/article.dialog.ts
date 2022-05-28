// Angular Core
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-article',
  templateUrl: './article.dialog.html',
  styleUrls: ['./article.dialog.scss']
})

export class ArticleDialog {

	constructor (
		public dialogRef: MatDialogRef<ArticleDialog>,
		@Inject(MAT_DIALOG_DATA) public data: any,
	) {}

	close() {
		this.dialogRef.close(true);
	}

}