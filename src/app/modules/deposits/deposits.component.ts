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
import { DialogService } from 'src/app/shared/services/dialog.service';

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
	walletsLoading: boolean = true;
	depositsLoading: boolean = true;
	interestRates: any = environment.interestRates;
	wallets: any = [];
	depositsUnlocked: any = [];
	depositsLocked: any = [];
	selectedWallet: any;
	termLength: number = 0;
	blockchainHeight: number = 0;

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
			Validators.pattern('([1-9]|1[0-2])'),
			Validators.minLength(1),
			Validators.maxLength(2),
		]),
		interest: new FormControl('', []),
		rate: new FormControl('', [])
	});

  constructor(
		private themingService: ThemingService,
		private cloudService: CloudService,
		private helperService: HelperService,
		private dialogService: DialogService
	) {	}

	getThemingService() {
		return this.themingService;
	}

	getHelperService() {
		return this.helperService;
	}

	getDialogService() {
		return this.dialogService;
	}

	// show wallets in selection dropdown
	selectWallet(wallet:any) {
		this.selectedWallet = wallet;
	}

	// trigger term changes
	termChanges(length:any) {
		this.termLength = length;
		this.deposit.controls.term.patchValue(length, { emitEvent: true });
		this.deposit.controls.term.markAsTouched();
	}

	// set the amount of the deposit based on the select percentage
	setAmount(percent:number, wallet:any) {
		this.deposit.controls.amount.patchValue(((percent / 100) * this.wallets[wallet].balance).toFixed(6) || 0, { emitEvent: true });
		this.deposit.controls.amount.markAsTouched();
	}

	// return the correct interest rate percent from the 2D table
	getDepositInterest(amount: number, duration: number) {
		return (this.interestRates[duration - 1][Math.min(Math.floor(amount / 10000), 2)] * amount / 100).toFixed(6);
	}

	// return the correct interest rate from the 2D table
	getDepositRate(amount: number, duration: number) {
		return (this.interestRates[duration - 1][Math.min(Math.floor(amount / 10000), 2)].toFixed(2));
	}

	// reset deposit form
	reset() {
		this.selectedWallet = null;
		this.termLength = 0;
		this.deposit.reset();
	}

	// submit deposit form
	submit() {
		if (this.deposit.valid) {
			this.dialogService.openConfirmationDialog(this.deposit.value);
		}
	}

  ngOnInit(): void {
		// disable form controls
		this.deposit.controls.rate.disable();
		this.deposit.controls.interest.disable();
		// subscribe to wallets
		let wallets = this.cloudService.getWalletsData().subscribe((data:any) => {
			this.wallets = data.message.wallets;
			this.blockchainHeight = data.message.height;
			this.walletsLoading = false;
			this.deposit.valueChanges.pipe(debounceTime(500)).subscribe(() => {
				if (this.deposit.controls.term.value && this.deposit.controls.amount.value) {
					this.deposit.controls.interest.patchValue(this.getDepositInterest(this.deposit.controls.amount.value, this.termLength), { emitEvent: true });
					this.deposit.controls.rate.patchValue(this.getDepositRate(this.deposit.controls.amount.value, this.termLength), { emitEvent: true });
				}
			})
		})
		// subscribe to deposits
		let deposits = this.cloudService.listDeposits().subscribe((data:any) => {
			// loop through results and check if address exists in deposit
			for (let i = 0; i < data.message.deposits.length; i++) {
				if (data.message.deposits[i].address && data.message.deposits[i].locked) {
					this.depositsLocked.push(data.message.deposits[i]);
				}
				if (data.message.deposits[i].address && !data.message.deposits[i].locked) {
					this.depositsUnlocked.push(data.message.deposits[i]);
				}
			}
			this.depositsLoading = false;
		})
		// call wallets and deposits
		Promise.all([wallets, deposits]);
	}

}