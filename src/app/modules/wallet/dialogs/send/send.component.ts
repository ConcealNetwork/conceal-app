// App Variables
import { environment } from 'src/environments/environment';

// Angular Core
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { trigger, transition, style, animate } from '@angular/animations';

// Services
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CloudService } from 'src/app/shared/services/cloud.service';
import { DataService } from 'src/app/shared/services/data.service';

// Dialogs
@Component({
  selector: 'send',
  templateUrl: 'send.component.html',
	styleUrls: ['./send.component.scss'],
	animations: [
		trigger('transition', [
			transition(':enter', [
				style({ opacity: 0}),
				animate('0.3s ease-in', style({ opacity: 1}))
			])
		])
	]
})

export class SendDialog {

	// Variables
	transaction: boolean = false;
	confirmed: boolean = false;
	amount: number = 0;
	fee: number = environment.defaultFee;
	hasTwoFa: boolean = false;
	wallet: any;
	isLoading: boolean = false;

	constructor (
		public dialogRef: MatDialogRef<SendDialog>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private snackbarService: SnackbarService,
		private authService: AuthService,
		private cloudService: CloudService,
		private dataService: DataService
	) {
		this.wallet = this.data.wallet;
		// Check if 2fa is enabled
		this.authService.check2fa().subscribe((result: any) => {
			if(result.message.enabled) {
				this.hasTwoFa = true;
				this.formAuthorise.addControl('code', new FormControl('', [
					Validators.minLength(6),
					Validators.maxLength(6),
					Validators.pattern('^[0-9]*$'),
					Validators.required,
				]))
			} else {
				this.hasTwoFa = false;
				this.formAuthorise.addControl('password', new FormControl('', [
					Validators.required,
				]))
			}
		});
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

	setAmount(percent:number) {
		this.formTransaction.controls.amount.patchValue((percent / 100) * this.wallet.value.balance, { emitEvent: true });
	}

	close() {
		this.dialogRef.close(true);
	}

	review() {
		if (this.formTransaction.valid) {
			this.formConfirm.controls.amount.patchValue(this.formTransaction.value.amount, { emitEvent: true });
			this.formConfirm.controls.fee.patchValue(this.fee, { emitEvent: true });
			this.formConfirm.controls.toAddress.patchValue(this.formTransaction.value.toAddress, { emitEvent: true });
			this.formConfirm.controls.fromAddress.patchValue(this.wallet.key, { emitEvent: true });
			this.formConfirm.controls.paymentID.patchValue(this.formTransaction.value.paymentID, { emitEvent: true });
			this.formConfirm.controls.message.patchValue(this.formTransaction.value.message, { emitEvent: true });
			this.formConfirm.disable({emitEvent: false});
			this.transaction = true;
		}
	}

	confirm() {
		this.confirmed = true;
	}

	authorise() {
		if (this.formAuthorise.valid) {
			this.isLoading = true;
			this.cloudService.createTransaction(
				this.formConfirm.value.amount.toFixed(6),
				this.formConfirm.value.fromAddress,
				this.formConfirm.value.toAddress,
				this.formConfirm.value.paymentID || '',
				this.formConfirm.value.message || '',
				this.formAuthorise.value.code || '',
				this.formAuthorise.value.password || ''
			).subscribe((data: any) => {
				if (data.result === 'success') {
					this.snackbarService.openSnackBar('Transaction successfully sent!', 'Dismiss');
					this.cloudService.getWalletsData().subscribe((data:any) => {
						this.dataService.setWallets(data.message.wallets);
					});
					this.isLoading = false;
					this.dialogRef.close(true);
				} else if (data.result === 'error') {
					this.snackbarService.openSnackBar(data.message, 'Dismiss');
					this.isLoading = false;
				} else {
					this.snackbarService.openSnackBar('Whoops, something went wrong', 'Dismiss');
					this.isLoading = false;
				}
			});
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