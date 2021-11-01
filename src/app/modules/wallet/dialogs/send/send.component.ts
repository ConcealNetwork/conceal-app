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
	transaction: boolean = false;
	confirmed: boolean = false;

	// form values
	amount: number = 0;
	fee: number = 0.001;
	fromAddress: string = 'ccx7Nvoi2iYj7uw4k5EEGCN6ogBPzGrDMY6Lnj16ZwSKZrHZ5zVh29HXtznxBsofFP8JB32YYBmtwLdoEirjAbYo4DBZfA4r7X';

	hasTwoFa: boolean = true;

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
		message: new FormControl('', [
			Validators.minLength(1),
			Validators.maxLength(260),
		]),
	});

	formConfirm: FormGroup = new FormGroup({
		amount: new FormControl({disabled: true}, Validators.required),
		fee: new FormControl({disabled: true}, Validators.required),
		fromAddress: new FormControl({disabled: true}, Validators.required),
		toAddress: new FormControl({disabled: true}, Validators.required),
		paymentID: new FormControl({disabled: true}),
		message: new FormControl({disabled: true}),
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
			this.transaction = true;
		}
	}

	confirm() {
		if (this.formConfirm.valid) {
			this.confirmed = true;
		}
	}

	authorise() {
		if (this.formAuthorise.valid) {
			this.dialogRef.close(true);
		}
	}

}