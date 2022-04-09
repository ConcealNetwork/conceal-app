// Imports
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// Services
import { DialogService } from '../../services/dialog.service';
import { SnackbarService } from '../../services/snackbar.service';
import { EthersService } from '../../services/ethers.service';
import { APIService } from '../../services/api.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-ccx',
  templateUrl: './ccx.component.html',
  styleUrls: ['./ccx.component.scss']
})

export class CcxSwapComponent implements OnInit {

	public isEditable: boolean = false;
	public form1!: FormGroup;

  constructor (
		private _routes: ActivatedRoute,
		private dialogService: DialogService,
		private snackbarService: SnackbarService,
		private ethersService: EthersService,
		private apiService: APIService,
		public dataService: DataService
	) {	}

	// Get Services
	getDialogService() {
		return this.dialogService;
	}
	getSnackbarService() {
		return this.snackbarService;
	}
	getEthersService() {
		return this.ethersService;
	}
	getAPIService() {
		return this.apiService;
	}
	getDataService(): any {
		return this.dataService;
	}

	initializeForm() {
		this.form1 = new FormGroup({
			fromAddress: new FormControl('', [
				Validators.pattern('^0x[a-fA-F0-9]{40}$'),
				Validators.required,
				Validators.minLength(42),
				Validators.maxLength(42),
			]),
			toAddress: new FormControl('', [
				Validators.pattern('^ccx[a-zA-Z0-9]{95}$'),
				Validators.required,
				Validators.minLength(98),
				Validators.maxLength(98),
			]),
			email: new FormControl('', [
				Validators.email,
			])
		});
	}

	// resets app data
	setDefaults() {
		this.dataService.loading = false;
		this.dataService.step = 0;
		this.dataService.stepCompleted = false;
		this.dataService.paymentId = '';
	}

	// Submit Form
	formSubmit() {
		if (this.form1.valid) {
			let amount = this.form1.value.amount;
			let toAddress = this.form1.value.toAddress;
			let fromAddress = this.form1.value.fromAddress;
			let email = this.form1.value.email;
			if (this.getDataService().ccxSwapBalance < amount) {
				this.snackbarService.openSnackBar('Due to high demand, there are not enough funds to cover this transfer. Please check back later.', 'Dismiss');
			} else {
				this.ethersService.sendwCCXDeposit(email, amount, toAddress, fromAddress);
				// debug
				console.log(email, amount, toAddress, fromAddress);
			}
		}
	}

	// Event fired when component initializes
  ngOnInit(): void {
		// reset app data
		this.setDefaults();
		// Setup Forms
		this.initializeForm();
		// Add from control after response
		this._routes.data.subscribe((response: any) => {
			// Setup Services
			this.apiService.fetchCCXSwapBalance();
			this.ethersService.checkMetaMask();
			// common config data
			this.dataService.maxSwapAmount = response.config.common.maxSwapAmount;
			this.dataService.minSwapAmount = response.config.common.minSwapAmount;
			// wccx config data
			this.dataService.wccxAccountAddress = response.config.wccx.accountAddress;
			this.dataService.chainId = response.config.wccx.chainId;
			this.dataService.confirmations = response.config.wccx.confirmations;
			this.dataService.contractAddress = response.config.wccx.contractAddress;
			this.dataService.contractAbi = response.config.wccx.contractAbi;
			this.dataService.provider = response.config.wccx.provider;
			this.dataService.wccxUnits = response.config.wccx.units;
			this.dataService.gasMultiplier = response.config.tx.gasMultiplier;
			// ccx config data
			this.dataService.ccxAccountAddress = response.config.ccx.accountAddress;
			this.dataService.ccxUnits = response.config.ccx.units;
			// Setup the form variables
			this.form1.addControl('amount', new FormControl('', [
				Validators.pattern('^[0-9]+\.?[0-9]*$'),
				Validators.required,
				Validators.max(response.config.common.maxSwapAmount),
				Validators.min(response.config.common.minSwapAmount)
			]))
    });
	}

}