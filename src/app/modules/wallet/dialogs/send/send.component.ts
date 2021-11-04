// Angular
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

import { SnackbarService } from '../../../../shared/services/snackbar.service';

// Dialogs
@Component({
  selector: 'send',
  templateUrl: 'send.component.html',
	styleUrls: ['./send.component.scss'],
})

export class SendDialog {

	isSmallScreen: boolean = false;
	transaction: boolean = false;
	confirmed: boolean = false;

	// form values
	amount: number = 0;
	fee: number = 0.001;
	fromAddress: string = 'ccx7Nvoi2iYj7uw4k5EEGCN6ogBPzGrDMY6Lnj16ZwSKZrHZ5zVh29HXtznxBsofFP8JB32YYBmtwLdoEirjAbYo4DBZfA4r7X';

	hasTwoFa: boolean = true;

	constructor (
		public breakpointObserver: BreakpointObserver,
		public dialogRef: MatDialogRef<SendDialog>, @Inject(MAT_DIALOG_DATA) public data: any,
		private snackbarService: SnackbarService,
	) {
		this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
		.subscribe((state: BreakpointState) => {
			if (state.matches) {
				// Matches small viewport or handset in portrait mode
				this.isSmallScreen = true;
			} else {
				this.isSmallScreen = false;
			}
		})
		if (this.hasTwoFa) {
			this.formAuthorise.addControl('twofaFormControl', new FormControl('', [
				Validators.minLength(6),
				Validators.maxLength(6),
				Validators.pattern('^[0-9]*$'),
				Validators.required,
			]))
		}
		if (!this.hasTwoFa) {
			this.formAuthorise.addControl('passwordFormControl', new FormControl('', [
				Validators.required,
			]))
		}
	}

	formTransaction: FormGroup = new FormGroup({
		amount: new FormControl('', [
			Validators.pattern('^[0-9]+\.?[0-9]*$'),
			Validators.required,
		]),
		toAddress: new FormControl('', [
			Validators.required,
			Validators.minLength(98),
			Validators.maxLength(98),
		]),
		paymentID: new FormControl('', [
			Validators.minLength(64),
			Validators.maxLength(64),
		]),
		includeMsg: new FormControl('', []),
		message: new FormControl('', [
			Validators.minLength(1),
			Validators.maxLength(260),
		]),
	});

	formConfirm: FormGroup = new FormGroup({
		amount: new FormControl(),
		fee: new FormControl(),
		fromAddress: new FormControl(),
		toAddress: new FormControl(),
		paymentID: new FormControl(),
		message: new FormControl(),
	});

	formAuthorise: FormGroup = new FormGroup({});

	setAmount(value:number) {}

	close() {
		this.dialogRef.close(true);
	}

	review() {
		if (this.formTransaction.valid) {
			this.formConfirm.controls.amount.patchValue(this.formTransaction.value.amount, { emitEvent: true });
			this.formConfirm.controls.fee.patchValue(this.fee, { emitEvent: true });
			this.formConfirm.controls.toAddress.patchValue(this.formTransaction.value.toAddress, { emitEvent: true });
			this.formConfirm.controls.fromAddress.patchValue(this.fromAddress, { emitEvent: true });
			this.formConfirm.controls.paymentID.patchValue(this.formTransaction.value.paymentID, { emitEvent: true });
			this.formConfirm.controls.message.patchValue(this.formTransaction.value.message, { emitEvent: true });
			this.formConfirm.disable({emitEvent: false});
			this.transaction = true;
			this.dialogRef.updateSize('500px', 'auto');
		}
	}

	confirm() {
		this.confirmed = true;
		this.dialogRef.updateSize('350px', 'auto');
	}

	authorise() {
		if (this.formAuthorise.valid) {
			this.dialogRef.close(true);
		}
	}

	paste(item:string) {
		if (navigator.clipboard) {
			navigator.clipboard.readText()
			.then(text => {
				if (item == 'toAddress') {this.formTransaction.controls.toAddress.setValue(text)}
				if (item == 'paymentID') {this.formTransaction.controls.paymentID.setValue(text)}
				if (item == 'twofa') {this.formAuthorise.controls.twofaFormControl.setValue(text)}
				this.snackbarService.openSnackBar('Copied text from clipboard', 'Dismiss');
			})
			.catch(err => {
				this.snackbarService.openSnackBar(err, 'Dismiss');
			});
		}
	}

}