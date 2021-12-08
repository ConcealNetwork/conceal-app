// Angular
import { Component, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { trigger, transition, style, animate } from '@angular/animations';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';

// Services
import { CloudService } from 'src/app/shared/services/cloud.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { ThemingService } from 'src/app/shared/services/theming.service';
import { CordovaService } from 'src/app/shared/services/cordova.service';

// Dialogs
@Component({
  selector: 'export',
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss'],
	animations: [
		trigger('transition', [
			transition(':enter', [
				style({ opacity: 0}),
				animate('0.3s ease-in', style({ opacity: 1}))
			])
		])
	]
})

export class ExportDialog {

	isFormLoading: boolean = true;
	isLoading: boolean = false;
	hasTwoFa: boolean = false;
	haveKeys: boolean = false;
	keys!: any;

	export: FormGroup = new FormGroup({
		code: new FormControl('', [
		Validators.minLength(6),
		Validators.maxLength(6),
			Validators.pattern('^[0-9]*$'),
			Validators.required,
		])
	});

	constructor (
		private cloudService: CloudService,
		private authService: AuthService,
		private snackbarService: SnackbarService,
		private helperService: HelperService,
		private themingService: ThemingService,
		private cordovaService: CordovaService,
		private clipboard: Clipboard,
		public dialogRef: MatDialogRef<ExportDialog>, @Inject(MAT_DIALOG_DATA) public data: any
	) {
		// Check if 2fa is enabled
		this.authService.check2fa().subscribe((result: any) => {
			if(result.message.enabled) {
				this.hasTwoFa = true;
				this.isFormLoading = false;
			} else {
				this.hasTwoFa = false;
				this.isFormLoading = false;
			}
		})
	}

	getHelperService() {
		return this.helperService;
	}

	submit() {
		if (this.export.valid) {
			this.isLoading = true;
			this.cloudService.getWalletKeys(this.data.address, this.export.value.code).subscribe((data: any) => {
				this.isLoading = false;
				if (data.result === 'success') {
					if(!this.themingService.isSmallScreen) {
						this.dialogRef.updateSize('700px');
					}
					this.snackbarService.openSnackBar('Success', 'Dismiss');
					this.isLoading = false;
					this.haveKeys = true;
					this.keys = data.message;
				} else if (data.result === 'error') {
					this.snackbarService.openSnackBar(data.message, 'Dismiss');
					this.isLoading = false;
					this.haveKeys = false;
				} else {
					this.snackbarService.openSnackBar('Whoops, something went wrong', 'Dismiss');
					this.isLoading = false;
					this.haveKeys = false;
				}
			});
		}
	}

	// Download private keys
  download(): void {
		const a = document.createElement('a')
		const objectUrl = URL.createObjectURL(new Blob([JSON.stringify(this.keys)], {type: 'text/json'}));
		a.href = objectUrl
		a.download = `${this.data.address}.json`;
		a.click();
		URL.revokeObjectURL(objectUrl);
  }

	close() {
		this.dialogRef.close(true);
	}

	paste() {
		if (this.cordovaService.onCordova && (this.cordovaService.device.platform === 'iOS' || this.cordovaService.device.platform === 'Android')) {
			this.clipboard.paste().then(
				(resolve: string) => {
						this.export.controls.code.setValue(resolve);
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
					this.export.controls.code.setValue(text);
					this.snackbarService.openSnackBar('Copied text from clipboard', 'Dismiss');
				})
				.catch(err => {
					this.snackbarService.openSnackBar(err, 'Dismiss');
				});
			}
		}
	}

}