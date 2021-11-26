// Angular Core
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

// Services
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CloudService } from 'src/app/shared/services/cloud.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.dialog.html',
  styleUrls: ['./confirmation.dialog.scss']
})

export class ConfirmationDialog {

	// Variables
	hasTwoFa!: boolean;
	isFormLoading: boolean = true;
	isLoading: boolean = false;

	constructor (
		public dialogRef: MatDialogRef<ConfirmationDialog>,
		@Inject(MAT_DIALOG_DATA) public data: any,
		private snackbarService: SnackbarService,
		private authService: AuthService,
		private cloudService: CloudService
	) {
		console.log(this.data);
		// Check if 2fa is enabled
		this.authService.check2fa().subscribe((result: any) => {
			if(result.message.enabled) {
				this.hasTwoFa = true;
				this.isFormLoading = false;
				this.confirmation.addControl('code', new FormControl('', [
					Validators.minLength(6),
					Validators.maxLength(6),
					Validators.pattern('^[0-9]*$'),
					Validators.required,
				]))
			} else {
				this.hasTwoFa = false;
				this.isFormLoading = false;
				this.confirmation.addControl('password', new FormControl('', [
					Validators.required,
				]))
			}
		})
	}

	confirmation: FormGroup = new FormGroup({});

	close() {
		this.dialogRef.close(true);
	}

	paste(item:string) {
		if (navigator.clipboard) {
			navigator.clipboard.readText()
			.then(text => {
				if (item == 'twofa') {this.confirmation.controls.twofaFormControl.setValue(text)}
				this.snackbarService.openSnackBar('Copied text from clipboard', 'Dismiss');
			})
			.catch(err => {
				this.snackbarService.openSnackBar(err, 'Dismiss');
			});
		}
	}

	authorise() {
		if (this.confirmation.valid) {
			this.isLoading = true;
			this.cloudService.createDeposit(
				this.data.deposit.amount,
				this.data.deposit.wallet,
				this.data.deposit.term,
				this.confirmation.value.code || '',
				this.confirmation.value.password || '',
			).subscribe((data:any) => {
				this.isLoading = false;
				if (data.result === 'success') {
					this.snackbarService.openSnackBar('Deposit created successfully!', 'Dismiss');
					this.close();
				} else if (data.result === 'error') {
					this.snackbarService.openSnackBar(data.message, 'Dismiss');
				} else {
					this.snackbarService.openSnackBar('Whoops, something went wrong', 'Dismiss');
					this.close();
				}
			})
		}
	}

}
