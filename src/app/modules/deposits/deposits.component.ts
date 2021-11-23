// App Variables
import { environment } from 'src/environments/environment';3

// Angular Core
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

// Services
import { ThemingService } from 'src/app/shared/services/theming.service';
import { CloudService } from 'src/app/shared/services/cloud.service';
import { HelperService } from 'src/app/shared/services/helper.service';

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

	// Variables
	isLoading: boolean = true;
	interestRates: any = environment.interestRates;
	wallets: any = [];
	selectedWallet: any;

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

	setAmount(percent:number, wallet:any) {
		this.deposit.controls.amount.patchValue(((percent / 100) * this.wallets[wallet].balance).toFixed(6) || 0, { emitEvent: true });
	}

  ngOnInit(): void {
		this.cloudService.getWalletsData().subscribe((data:any) => {
			this.wallets = data.message.wallets;
			console.log(this.wallets);
			this.isLoading = false;
		})
	}

}
