// Angular
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

// Dialogs
@Component({
  selector: 'send',
  templateUrl: 'send.component.html',
	styleUrls: ['./send.component.scss'],
})

export class SendDialog {

	isSmallScreen: boolean = false;

	constructor (
		public breakpointObserver: BreakpointObserver,
		public dialogRef: MatDialogRef<SendDialog>, @Inject(MAT_DIALOG_DATA) public data: any
	) {
		this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
		.subscribe((state: BreakpointState) => {
			if (state.matches) {
				// Matches small viewport or handset in portrait mode
				this.isSmallScreen = true;
			} else {
				this.isSmallScreen = false;
			}
		});
	}

	pay: FormGroup = new FormGroup({
		amountFormControl: new FormControl('', [
			Validators.pattern('^[0-9]+\.?[0-9]*$'),
			Validators.required,
		]),
		toaddressFormControl: new FormControl('', [
			Validators.required,
			Validators.minLength(98),
			Validators.maxLength(98),
		]),
		paymentidFormControl: new FormControl('', [
			Validators.minLength(64),
			Validators.maxLength(64),
		]),
		messageFormControl: new FormControl('', [
			Validators.minLength(1),
			Validators.maxLength(260),
		]),
	});

	close() {
		this.dialogRef.close(true);
	}

	setAmount(value:number) {}

	submit() {
		if (this.pay.valid) {
			console.log('valid');
		} else {
			console.log('not valid');
		}
	}

}