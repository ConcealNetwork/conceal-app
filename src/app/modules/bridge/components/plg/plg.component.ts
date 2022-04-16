// Angular
import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

// 3rd Party
import { Subscription } from "rxjs";
import QRCodeStyling from 'qr-code-styling';

// Services
import { DialogService } from '../../services/dialog.service';
import { SnackbarService } from '../../services/snackbar.service';
import { EthersService } from '../../services/ethers.service';
import { APIService } from '../../services/api.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-plg',
  templateUrl: './plg.component.html',
  styleUrls: ['./plg.component.scss']
})

export class PlgSwapComponent implements OnInit, OnDestroy {

  watcherSubscription!: Subscription;

	// QR Code Element
	@ViewChild('qrcode1', {static: true}) qrcode1!: ElementRef;
	@ViewChild('qrcode2', {static: true}) qrcode2!: ElementRef;

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
	getDataService() {
		return this.dataService;
	}

	initializeForm() {
		this.form1 = new FormGroup({
			fromAddress: new FormControl('', [
				Validators.pattern('^ccx[a-zA-Z0-9]{95}$'),
				Validators.required,
				Validators.minLength(98),
				Validators.maxLength(98),
			]),
			toAddress: new FormControl('', [
				Validators.pattern('^0x[a-fA-F0-9]{40}$'),
				Validators.required,
				Validators.minLength(42),
				Validators.maxLength(42),
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
	}

	// Submit Form
	formSubmit() {
		this.apiService.fetchWCCXSwapBalance();
		if (this.form1.valid) {
			let amount = this.form1.value.amount;
			let toAddress = this.form1.value.toAddress;
			let fromAddress = this.form1.value.fromAddress;
			let email = this.form1.value.email;
			if (this.getDataService().wccxSwapBalance < amount) {
				this.snackbarService.openSnackBar('Due to high demand, there are not enough funds to cover this transfer. Please check back later.', 'Dismiss');
			} else {
				this.ethersService.sendGasFeePayment(email, amount, toAddress, fromAddress);
				// debug
				console.log(email, amount, toAddress, fromAddress);
			}
		}
	}

	addToken() {
		this.ethersService.addWCCXToken('0x137Ee749f0F8c2eD34cA00dE33BB59E3dafA494A');
	}

	hex(number: number) {
		return '0x' + Math.abs(number).toString(16);
	}

	addCustomChains() {
		let chainId = this.hex(137);
		let chainName = 'Polygon Mainnet';
		let name ='Matic';
		let symbol = 'MATIC';
		let decimals = 18;
		let rpcUrls = 'https://polygon-rpc.com';
		let blockExplorerUrls = 'https://polygonscan.com/';
		this.ethersService.addCustomChains(
			chainId, chainName, name, symbol, decimals, rpcUrls, blockExplorerUrls
		);
	}

	// Event fired when component initializes
  ngOnInit(): void {

    this.watcherSubscription = this.dataService.paymentIdChange.subscribe(
      (paymentId: string) => {
				if(paymentId) {
					this.createCodes(paymentId);
				}
      }
    );

		this.watcherSubscription = this.dataService.chainIdChange.subscribe(
      (id: string) => {
				if(id != this.hex(137)) {
					this.addCustomChains();
				}
      }
    );

		// reset app data
		this.setDefaults();
		// Setup Forms
		this.initializeForm();
		// Add from control after response
		this._routes.data.subscribe((response: any) => {
			// Setup Services
			this.apiService.fetchWCCXSwapBalance();
			this.ethersService.checkMetaMask();
			this.ethersService.checkChainId();
			// common config data
			this.dataService.maxSwapAmount = response.config.common.maxSwapAmount;
			this.dataService.minSwapAmount = response.config.common.minSwapAmount;
			// wccx config data
			this.dataService.wccxAccountAddress = response.config.wccx.accountAddress;
			this.dataService.chainId = response.config.wccx.chainId;
			this.dataService.confirmations = response.config.wccx.confirmations;
			this.dataService.contractAddress = response.config.wccx.contractAddress;
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

	ngOnDestroy() {
    this.watcherSubscription.unsubscribe();
  }

	createCodes(paymentId: string){
    const qr1 = new QRCodeStyling({
			width: 285,
			height: 285,
      margin: 0,
      data: this.dataService.ccxAccountAddress,
			image: "../assets/images/qrcode.png",
      dotsOptions: {
        color: "#33383B",
        type: "dots"
      },
			cornersSquareOptions: {
				color:' #33383B',
				type: 'dot'
			},
			cornersDotOptions: {
				color:' #33383B',
				type: 'dot'
			},
      backgroundOptions: {
        color: "#fff"
      },
      imageOptions: {
        margin: 0,
				imageSize: 0.3,
				hideBackgroundDots: false
      }
    });
		const qr2 = new QRCodeStyling({
			width: 285,
			height: 285,
      margin: 0,
      data: paymentId,
			image: "../assets/images/qrcode.png",
      dotsOptions: {
        color: "#33383B",
        type: "dots"
      },
			cornersSquareOptions: {
				color:' #33383B',
				type: 'dot'
			},
			cornersDotOptions: {
				color:' #33383B',
				type: 'dot'
			},
      backgroundOptions: {
        color: "#fff"
      },
      imageOptions: {
        margin: 0,
				imageSize: 0.3,
				hideBackgroundDots: false
      }
    });
    // Create new QRCode Object
    qr1.append(this.qrcode1.nativeElement);
    qr2.append(this.qrcode2.nativeElement);
  }

}