import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ApiService } from 'src/app/shared/services/api.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

	currencies: any;

  constructor(
		private apiService: ApiService,
		private snackbarService: SnackbarService
	) { }

	settings: FormGroup = new FormGroup({
		currency: new FormControl('', [
			Validators.required
		])
	});

  ngOnInit(): void {
		let currency = localStorage.getItem('currency');
		this.settings.controls.currency.patchValue(currency);
		this.getCurrency();
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
		// Promise.all([request]).catch(err => {
		// 	if(err) {
		// 		this.snackbarService.openSnackBar(err, 'Dismiss');
		// 	}
		// });
	}

	setCurrency(currency: string) {
		localStorage.setItem('currency', currency);
		this.snackbarService.openSnackBar('Currency has changed to: ' + currency.toLocaleUpperCase(), 'Dismiss');
	}

}
