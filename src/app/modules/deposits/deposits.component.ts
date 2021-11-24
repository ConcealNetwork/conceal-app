// App Variables
import { environment } from 'src/environments/environment';

// Angular Core
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { debounceTime } from 'rxjs/operators';

// Services
import { ThemingService } from 'src/app/shared/services/theming.service';
import { CloudService } from 'src/app/shared/services/cloud.service';
import { HelperService } from 'src/app/shared/services/helper.service';

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
					style({ opacity: 0 }),
					stagger(100, [
						animate('0.2s', style({ opacity: 1 }))
					])
				], {optional: true})
			])
		])
	]
})

export class DepositsComponent implements OnInit {

	@ViewChild('deposit') form: any;

	displayedColumns: string[] = ['month', 'tier1', 'tier2', 'tier3'];
  dataSource = ELEMENT_DATA;

	// Variables
	isLoading: boolean = true;
	interestRates: any = environment.interestRates;
	wallets: any = [];
	selectedWallet: any;
	termLength: number = 0;

	deposit: FormGroup = new FormGroup({
		wallet: new FormControl('', [
			Validators.required,
			Validators.minLength(98),
			Validators.maxLength(98),
		]),
		amount: new FormControl('', [
			Validators.pattern('^[0-9]+\.?[0-9]*$'),
			Validators.required,
		]),
		term: new FormControl('', [
			Validators.required,
		]),
		interest: new FormControl('', [
			Validators.required,
		]),
		rate: new FormControl('', [
			Validators.required,
		]),
		code: new FormControl('', [
			Validators.minLength(6),
			Validators.maxLength(6),
			Validators.pattern('^[0-9]*$'),
			Validators.required,
		]),
	});

  constructor(
		private themingService: ThemingService,
		private cloudService: CloudService,
		private helperService: HelperService
	) {	}

	getThemingService() {
		return this.themingService;
	}

	getHelperService() {
		return this.helperService;
	}

	selectWallet(wallet:any) {
		this.selectedWallet = wallet;
	}

	termChanges(length:any) {
		this.termLength = length;
		this.deposit.controls.term.patchValue(length, { emitEvent: true });
	}

	setAmount(percent:number, wallet:any) {
		this.deposit.controls.amount.patchValue(((percent / 100) * this.wallets[wallet].balance).toFixed(6) || 0, { emitEvent: true });
	}

	reset() {
		this.selectedWallet = null;
		this.termLength = 0;
		this.deposit.reset();
	}

	// return the correct interest rate percent from the 2D table
	getDepositInterest(amount: number, duration: number) {
		return (this.interestRates[duration - 1][Math.min(Math.floor(amount / 10000), 2)] * amount / 100).toFixed(6);
	}

  ngOnInit(): void {
		this.deposit.controls.rate.disable();
		this.deposit.controls.interest.disable();
		this.cloudService.getWalletsData().subscribe((data:any) => {
			this.wallets = data.message.wallets;
			this.isLoading = false;
			this.deposit.valueChanges.pipe(debounceTime(500)).subscribe(() => {
				if (this.deposit.controls.term.value && this.deposit.controls.amount.value) this.deposit.controls.interest.patchValue(this.getDepositInterest(this.deposit.controls.amount.value, this.termLength), { emitEvent: true });
			})
		})
	}

}