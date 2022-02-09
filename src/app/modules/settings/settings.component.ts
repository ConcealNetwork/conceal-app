import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';

import { AuthService } from 'src/app/shared/services/auth.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { CloudService } from 'src/app/shared/services/cloud.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ThemingService } from 'src/app/shared/services/theming.service';
import { CordovaService } from 'src/app/shared/services/cordova.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
	animations: [
		trigger('transition', [
			transition(':enter', [
				query('#cards', [
					style({ opacity: 0 }),
					stagger(100, [
						animate('0.4s', style({ opacity: 1 }))
					])
				], {optional: true})
			])
		])
	]
})

export class SettingsComponent implements OnInit {

	isLoggedIn: boolean = false;
	isLoading: boolean = true;
	hasTwoFa: boolean = false;
	show2fa: boolean = false;
	secretQR: string = '';
	secret: string = '';
	username: string = '';
	email: string = '';
	currencies: any;
	accountButtonLabel: string = '';
	modes: any = [
		{
			name: '💻 Follow System',
			value: 'follow-system'
		},
		{
			name: '☀️ Light Mode',
			value: 'light-theme'
		},
		{
			name: '🌙 Dark Mode',
			value: 'dark-theme'
		}
	];

  constructor(
		private authService: AuthService,
		private apiService: ApiService,
		private cloudService: CloudService,
		private cordovaService: CordovaService,
		private snackbarService: SnackbarService,
		private theming: ThemingService,
		private clipboard: Clipboard,
	) { }

	hub: FormGroup = new FormGroup({
		currency: new FormControl('', [
			Validators.required
		]),
		mode: new FormControl('', [
			Validators.required
		])
	});

	cloud: FormGroup = new FormGroup({
		email: new FormControl('', [
			Validators.required,
			Validators.email
		])
	});

	twofa: FormGroup = new FormGroup({
		code: new FormControl('', [
			Validators.minLength(6),
			Validators.maxLength(6),
			Validators.pattern('^[0-9]*$'),
			Validators.required
		])
	});

  ngOnInit(): void {
		this.authService.isLoginSubject.subscribe((isLoggedIn: boolean) => {
			this.isLoggedIn = isLoggedIn;
			if(this.isLoggedIn) {
				let user = this.cloudService.getUser().subscribe((user:any) => {
					if(user) {
						this.username = user.message.name;
						this.email = user.message.email;
						this.cloud.controls.email.setValue(user.message.email);
						this.accountButtonLabel = 'Change Email';
					}
				})
				let qr = this.authService.getQRCode().subscribe((result: any) => {
					if (result.message.qrCodeUrl) {
						this.secretQR = result.message.qrCodeUrl;
						this.secret = result.message.qrCodeUrl.split(' ')[0].split('secret%3')[1];
					}
				})
				let twofa =	this.authService.check2fa().subscribe((result: any) => {
					if(result.message.enabled) {
						this.hasTwoFa = true;
					}
				})
				Promise.all([qr, user, twofa]).catch(err => {
					if(err) {
						this.isLoading = false;
						this.snackbarService.openSnackBar('Could not query all data', 'Dismiss');
					}
				}).then(() => {
					// hacky way to wait for promises to resolve
					setTimeout(() => {
						this.isLoading = false;
					}, 1000);
				});
			}
		});

		let currencies = this.apiService.getCurrencies().subscribe((currencies:any) => {
			if(currencies) {
				this.currencies = currencies;
				if (!localStorage.getItem('currency')) {
					this.hub.controls.currency.patchValue('usd');
				}
			} else {
				this.snackbarService.openSnackBar('Could not get list of currencies', 'Dismiss');
			}
		})
		Promise.all([currencies]).catch(err => {
			if(err) {
				this.isLoading = false;
				this.snackbarService.openSnackBar('Could not query all data', 'Dismiss');
			}
		}).then(() => {
			// hacky way to wait for promises to resolve
			setTimeout(() => {
				this.isLoading = false;
			}, 1000);
		});

		let currency = localStorage.getItem('currency');
		this.hub.controls.currency.patchValue(currency);
		let mode = localStorage.getItem('mode');
		if (mode) {
			this.hub.controls.mode.patchValue(mode);
		} else {
			this.hub.controls.mode.patchValue('follow-system');
		}

  }

	// reset settings form
	clear(form:string) {
		if (form === 'hub') {
			this.hub.reset();
		}
		if (form === 'cloud') {
			this.cloud.reset();
		}
		if (form === 'twofa') {
			this.twofa.reset();
		}
	}

	changeSettings() {
		let currency = this.hub.controls.currency.value;
		let mode = this.hub.controls.mode.value;
		localStorage.setItem('currency', currency);
		if (mode === 'follow-system') {
			localStorage.removeItem('mode');
			const darkModeOn = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
			const lightModeOn = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
			if (darkModeOn) {
				this.theming.theme.next("dark-theme");
			}
			if (lightModeOn) {
				this.theming.theme.next("light-theme");
			}
		} else {
			this.theming.theme.next(mode);
			localStorage.setItem('mode', mode);
		}
		this.snackbarService.openSnackBar("Settings have been updated", 'Dismiss');
	}

	changeEmail() {
		let email = this.cloud.controls.email.value;
		this.authService.changeEmail(email).subscribe((result: any) => {
			if(result.result === 'success') {
				this.snackbarService.openSnackBar(`Success! Check ${email} to confirm`, 'Dismiss');
			} else {
				this.snackbarService.openSnackBar(`${result.message}`, 'Dismiss');
			}
		})
	}

	resetPassword() {
		this.authService.resetPassword(this.email).subscribe((result: any) => {
			if(result.result === 'success') {
				this.snackbarService.openSnackBar(`Success! Check ${this.email} to reset your password`, 'Dismiss');
			} else {
				this.snackbarService.openSnackBar("Could not reset password", 'Dismiss');
			}
		})
	}

	change2fa(enabled: boolean) {
		let code = this.twofa.controls.code.value;
		if(enabled) {
			this.authService.disable2FA(code).subscribe((result: any) => {
				if(result.result === 'success') {
					this.snackbarService.openSnackBar("Two factor authentication has been disabled", 'Dismiss');
				} else {
					this.snackbarService.openSnackBar("Could not disable 2fa", 'Dismiss');
				}
			})
		} else {
			this.authService.enable2FA(code, true).subscribe((result: any) => {
				if(result.result === 'success') {
					this.snackbarService.openSnackBar("Two factor authentication has been enabled", 'Dismiss');
				} else {
					this.snackbarService.openSnackBar("Could not enable 2fa", 'Dismiss');
				}
			})
		}
	}

	paste() {
		if (this.cordovaService.onCordova && (this.cordovaService.device.platform === 'iOS' || this.cordovaService.device.platform === 'Android')) {
			this.clipboard.paste().then(
				(resolve: string) => {
						this.twofa.controls.code.setValue(resolve);
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
					this.twofa.controls.code.setValue(text);
					this.snackbarService.openSnackBar('Copied text from clipboard', 'Dismiss');
				})
				.catch(err => {
					this.snackbarService.openSnackBar(err, 'Dismiss');
				});
			}
		}
	}

	copy(value: any, message: string): void {
		if (this.cordovaService.onCordova && (this.cordovaService.device.platform === 'iOS' || this.cordovaService.device.platform === 'Android')) {
			this.clipboard.copy(value);
			this.snackbarService.openSnackBar(message, 'Dismiss');
		} else if (navigator.clipboard) {
			navigator.clipboard.writeText(value);
			this.snackbarService.openSnackBar(message, 'Dismiss');
		} else {
			this.snackbarService.openSnackBar('Could not access the clipboard', 'Dismiss');
		}
	}

}
