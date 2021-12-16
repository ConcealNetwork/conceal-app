import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

import { ApiService } from 'src/app/shared/services/api.service';
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
		private apiService: ApiService,
		private snackbarService: SnackbarService,
		private theming: ThemingService
	) { }

	settings: FormGroup = new FormGroup({
		currency: new FormControl('', [
			Validators.required
		]),
		mode: new FormControl('', [
			Validators.required
		])
	});

  ngOnInit(): void {
		this.getCurrency();
		let currency = localStorage.getItem('currency');
		this.settings.controls.currency.patchValue(currency);
		let mode = localStorage.getItem('mode');
		if (mode) {
			this.settings.controls.mode.patchValue(mode);
		} else {
			this.settings.controls.mode.patchValue('follow-system');
		}
  }

	// reset settings form
	reset() {
		this.settings.reset();
	}

	getCurrency() {
		this.apiService.getCurrencies().subscribe((currencies:any) => {
			if(currencies) {
				this.currencies = currencies;
			} else {
				this.snackbarService.openSnackBar('Could not get list of currencies', 'Dismiss');
			}
		})
	}

	saveHubSettings() {
		let currency = this.settings.controls.currency.value;
		let mode = this.settings.controls.mode.value;
		localStorage.setItem('currency', currency);
		if (mode === 'follow-system') {
			localStorage.removeItem('mode');
		} else {
			this.theming.theme.next(mode);
			localStorage.setItem('mode', mode);
		}
		this.snackbarService.openSnackBar("Settings have been updated", 'Dismiss');
	}

}
