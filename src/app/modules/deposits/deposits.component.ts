// App Variables
import { environment } from 'src/environments/environment';

// Angular Core
import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// RxJs
import { debounceTime } from 'rxjs/operators';

// Services
import { ThemingService } from 'src/app/shared/services/theming.service';
import { CordovaService } from 'src/app/shared/services/cordova.service';

export interface InterestMatrix {
  month: number;
  tier1: number;
  tier2: number;
  tier3: number;
}

const ELEMENT_DATA: InterestMatrix[] = [
  {month: 1, tier1: 0.24, tier2: 0.33, tier3: 0.41},
  {month: 2, tier1: 0.50, tier2: 0.67, tier3: 0.83},
  {month: 3, tier1: 0.78, tier2: 1.03, tier3: 1.28},
  {month: 4, tier1: 1.07, tier2: 1.40, tier3: 1.73},
  {month: 5, tier1: 1.38, tier2: 1.79, tier3: 2.21},
  {month: 6, tier1: 1.70, tier2: 2.20, tier3: 4.70},
  {month: 7, tier1: 2.04, tier2: 2.63, tier3: 3.21},
  {month: 8, tier1: 2.40, tier2: 3.07, tier3: 3.73},
  {month: 9, tier1: 2.78, tier2: 3.53, tier3: 4.28},
  {month: 10, tier1: 3.17, tier2: 4.00, tier3: 4.83},
  {month: 11, tier1: 3.58, tier2: 4.49, tier3: 5.41},
  {month: 12, tier1: 4.00, tier2: 5.00, tier3: 6.00},
];

@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.scss'],
	animations: [
		trigger('transition', [
			transition(':enter', [
				query('#cards', [
					style({ opacity: 0}),
					stagger(100, [
						animate('0.4s', style({ opacity: 1 }))
					])
				], {optional: true})
			])
		])
	]
})

export class DepositsComponent implements OnInit {

	@ViewChild('deposit') form: any;

	// Variables
	isLoading: boolean = true;

	// Table
	displayedColumns: string[] = ['month', 'tier1', 'tier2', 'tier3'];
  dataSource = ELEMENT_DATA;

	// Calculator
	showSlider: boolean = true;
	interestRates: any = environment.interestRates;
	termLength: number = 0;
	interest: any = 0;
	rate: any = 0;

	calculator: FormGroup = new FormGroup({
		amount: new FormControl('', [
			Validators.required,
			Validators.pattern('^[0-9]+\.?[0-9]*$'),
			Validators.min(1),
		]),
		term: new FormControl('', [
			Validators.required,
			Validators.pattern('([1-9]|1[0-2])'),
			Validators.minLength(1),
			Validators.maxLength(2),
		])
	});

  constructor(
		private themingService: ThemingService,
		private cordovaService: CordovaService,
	) { }

	getThemingService() {
		return this.themingService;
	}

  ngOnInit(): void {
		this.isLoading = false;
		if (this.cordovaService.onCordova && (this.cordovaService.device.platform === 'Android')) {
			this.showSlider = false;
		}
		this.calculator.valueChanges.pipe(debounceTime(500)).subscribe(() => {
			if (this.calculator.controls.term.value && this.calculator.controls.amount.value) {
				this.interest = this.getDepositInterest(this.calculator.controls.amount.value, this.termLength);
				this.rate = this.getDepositRate(this.calculator.controls.amount.value, this.termLength);
			}
		})
	}

	// trigger term changes
	termChanges(length:any) {
		this.termLength = length;
		this.calculator.controls.term.patchValue(length, { emitEvent: true });
		this.calculator.controls.term.markAsTouched();
	}

	// return the correct interest rate percent from the 2D table
	getDepositInterest(amount: number, duration: number) {
		return (this.interestRates[duration - 1][Math.min(Math.floor(amount / 10000), 2)] * amount / 100).toFixed(6);
	}

	// return the correct interest rate from the 2D table
	getDepositRate(amount: number, duration: number) {
		return (this.interestRates[duration - 1][Math.min(Math.floor(amount / 10000), 2)].toFixed(2));
	}

}
