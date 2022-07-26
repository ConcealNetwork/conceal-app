// App Variables
import { environment } from 'src/environments/environment';

// Angular Core
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { trigger, transition, style, animate } from '@angular/animations';

// 3rd Party
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';

// Services
import { CordovaService } from 'src/app/shared/services/cordova.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CloudService } from 'src/app/shared/services/cloud.service';
import { HelperService } from 'src/app/shared/services/helper.service';

// Dialogs
@Component({
  selector: 'compose',
  templateUrl: 'compose.component.html',
	styleUrls: ['./compose.component.scss'],
	animations: [
		trigger('transition', [
			transition(':enter', [
				style({ opacity: 0}),
				animate('0.3s ease-in', style({ opacity: 1}))
			])
		])
	]
})

export class ComposeDialog {

	// App Variables
	confirmed: boolean = false;
	destruct: number = 0;
	hasTwoFa: boolean = false;
	isLoading: boolean = false;
	selectedWallet: any;
	wallets: any = [];

	constructor (
		private cordovaService: CordovaService,
		private clipboard: Clipboard,
		private snackbarService: SnackbarService,
		private authService: AuthService,
		private cloudService: CloudService,
		private helperService: HelperService,
		public dialogRef: MatDialogRef<ComposeDialog>,
		@Inject(MAT_DIALOG_DATA) public data: any,
	) {
		// grab a list of the wallets on this account
		this.cloudService.getWalletsData().subscribe((data:any) => {
			if (data && data.result === 'success') {
				this.wallets = data.message.wallets;
			} else {
				this.isLoading = false;
				if (data) {
					this.snackbarService.openSnackBar(data.message, 'Dismiss');
				} else {
					this.snackbarService.openSnackBar('Could not retrieve wallet data', 'Dismiss');
				}
			}
		});
	}

	getHelperService() {
		return this.helperService;
	}

	// Form to create a new message
	form: FormGroup = new FormGroup({
		toAddress: new FormControl('', [
			Validators.required,
			Validators.pattern(/^[a-zA-Z0-9]{1,}$/),
			Validators.minLength(98),
			Validators.maxLength(98),
		]),
		fromAddress: new FormControl('', [
			Validators.required,
			Validators.minLength(98),
			Validators.maxLength(98),
		]),
		message: new FormControl('', [
			Validators.required,
			Validators.minLength(1),
			Validators.maxLength(260),
		]),
		destructTime: new FormControl('', [
			Validators.pattern('([1-9]|1[0-4])'),
			Validators.minLength(1),
			Validators.maxLength(14),
		]),
		selfDestruct: new FormControl('', []),
	});

	// form to authorize the transaction
	authorize: FormGroup = new FormGroup({});

	// Send the message
	confirm() {
		if (this.form.valid) {
			this.isLoading = true;
			this.confirmed = true;
			// Check if 2fa is enabled
			this.authService.check2fa().subscribe((result: any) => {
				if(result.message.enabled) {
					this.hasTwoFa = true;
					this.authorize.addControl('code', new FormControl('', [
						Validators.minLength(6),
						Validators.maxLength(6),
						Validators.pattern('^[0-9]*$'),
						Validators.required,
					]))
					this.isLoading = false;
				} else {
					this.hasTwoFa = false;
					this.authorize.addControl('password', new FormControl('', [
						Validators.required,
					]))
					this.isLoading = false;
				}
			})
		}
	}

	authorise() {
		if (this.authorize.valid) {
			this.isLoading = true;
			this.cloudService.sendMessage(
				this.form.value.toAddress,
				this.form.value.fromAddress,
				this.form.value.message || '',
				this.authorize.value.code || '',
				this.authorize.value.password || ''
			).subscribe((data: any) => {
				if (data.result === 'success') {
					this.snackbarService.openSnackBar('Message successfully sent!', 'Dismiss');
					this.isLoading = false;
					this.dialogRef.close(true);
				} else if (data.result === 'error') {
					this.snackbarService.openSnackBar(data.message, 'Dismiss');
					this.isLoading = false;
				} else {
					this.snackbarService.openSnackBar('Whoops, something went wrong', 'Dismiss');
					this.isLoading = false;
				}
			})
		}
	}

	close() {
		this.dialogRef.close(true);
	}

	// show wallets in selection dropdown
	selectWallet(wallet:any) {
		this.selectedWallet = wallet;
	}

	// trigger term changes
	destructTime(length:any) {
		this.destruct = length;
		this.form.controls.destructTime.patchValue(length, { emitEvent: true });
		this.form.controls.destructTime.markAsTouched();
	}

	paste(item: string) {
		if (this.cordovaService.onCordova && (this.cordovaService.device.platform === 'iOS' || this.cordovaService.device.platform === 'Android')) {
			this.clipboard.paste().then(
				(resolve: string) => {
					if (item == 'toAddress') {this.form.controls.toAddress.setValue(resolve)}
						this.snackbarService.openSnackBar('Copied text from clipboard', 'Dismiss');
					},
					(reject: string) => {
						this.snackbarService.openSnackBar(reject, 'Dismiss');
					}
			)
		} else if (navigator.clipboard) {
			if (navigator.clipboard) {
				navigator.clipboard.readText()
				.then(text => {
					if (item == 'toAddress') {this.form.controls.toAddress.setValue(text)}
					this.snackbarService.openSnackBar('Copied text from clipboard', 'Dismiss');
				})
				.catch(err => {
					this.snackbarService.openSnackBar(err, 'Dismiss');
				});
			}
		} else {
			this.snackbarService.openSnackBar('Clipboard not available', 'Dismiss');
		}
	}

}