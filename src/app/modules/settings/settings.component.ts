import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

import { Subscription } from "rxjs";

import { AuthService } from 'src/app/shared/services/auth.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { CloudService } from 'src/app/shared/services/cloud.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { ThemingService } from 'src/app/shared/services/theming.service';

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
	username: string = '';
	currencies: any;
	modes: any = [
		{
			name: 'Follow System',
			value: 'follow-system'
		},
		{
			name: 'Light Theme',
			value: 'light-theme'
		},
		{
			name: 'Dark Theme',
			value: 'dark-theme'
		}
	];

  constructor(
		private authService: AuthService,
		private apiService: ApiService,
		private cloudService: CloudService,
		private snackbarService: SnackbarService,
		private theming: ThemingService
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
		]),
	});

  ngOnInit(): void {

		this.authService.isLoginSubject.subscribe((isLoggedIn: boolean) => {
			this.isLoggedIn = isLoggedIn;
			if(this.isLoggedIn) {
				let user = this.cloudService.getUser().subscribe((user:any) => {
					if(user) {
						this.username = user.message.name;
						this.cloud.controls.email.setValue(user.message.email);
					}
				})
				let twofa =	this.authService.check2fa().subscribe((result: any) => {
					if(result.message.enabled) {
						this.hasTwoFa = true;
					}
				})
				Promise.all([user, twofa]).catch(err => {
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
	clear(type:string) {
		if (type === 'hub') {
			this.hub.reset();
		}
		if (type === 'cloud') {
			this.cloud.reset();
		}
	}

	saveHub() {
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

	saveCloud() {

	}

}
