// Angular Core
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Injectable({
	providedIn: 'root'
})

export class SnackbarService {

	snackbarVerticalPosition: MatSnackBarVerticalPosition = 'bottom';
	snackbarHorizontalPosition: MatSnackBarHorizontalPosition = 'right';

	constructor (
		private _snackBar: MatSnackBar,
		public breakpointObserver: BreakpointObserver
	) {
		// watch for changes of the screen size
		this.breakpointObserver.observe([
			Breakpoints.XSmall,
			Breakpoints.Small,
			Breakpoints.Medium,
			Breakpoints.Large,
			Breakpoints.XLarge
		]).subscribe((state: BreakpointState) => {
			if (state.matches) {
				if (state.breakpoints[Breakpoints.XSmall]) {
					this.snackbarHorizontalPosition = 'center';
					this.snackbarVerticalPosition = 'top';
				} else if (state.breakpoints[Breakpoints.Small]) {
					this.snackbarHorizontalPosition = 'center';
					this.snackbarVerticalPosition = 'top';
				} else if (state.breakpoints[Breakpoints.Medium]) {
					this.snackbarHorizontalPosition = 'right';
					this.snackbarVerticalPosition = 'bottom';
				} else if (state.breakpoints[Breakpoints.Large]) {
					this.snackbarHorizontalPosition = 'right';
					this.snackbarVerticalPosition = 'bottom';
				} else if (state.breakpoints[Breakpoints.XLarge]) {
					this.snackbarHorizontalPosition = 'right';
					this.snackbarVerticalPosition = 'bottom';
				}
			}
		})
	}

	openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 5000,
			panelClass: 'snack-notify',
			horizontalPosition: this.snackbarHorizontalPosition,
			verticalPosition: this.snackbarVerticalPosition,
    })
  }

}