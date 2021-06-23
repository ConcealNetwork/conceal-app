// Angular Core
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';

@Injectable({
	providedIn: 'root'
})

export class SnackbarService {

	snackbarVerticalPosition: MatSnackBarVerticalPosition = 'bottom';
	snackbarHorizontalPosition: MatSnackBarHorizontalPosition = 'right';

	constructor(private _snackBar: MatSnackBar) { }

	openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 10000,
			panelClass: 'snack-notify',
			horizontalPosition: this.snackbarHorizontalPosition,
			verticalPosition: this.snackbarVerticalPosition,
    });
  }

}