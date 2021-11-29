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
		this.apiService.getCurrencies().subscribe((currencies:any) => {
			this.currencies = currencies;
		})
		let currency = localStorage.getItem('currency');
		this.settings.controls.currency.patchValue(currency);
  }

	// reset settings form
	reset() {
		this.settings.reset();
	}

	setCurrency(currency: string) {
		localStorage.setItem('currency', currency);
		this.snackbarService.openSnackBar('Currency has changed to: ' + currency, 'Dismiss');
	}

}
