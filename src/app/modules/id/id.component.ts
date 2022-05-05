import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';

// Services
import { NameService } from './name.validator';
import { BalanceService } from './balance.validator';
import { CloudService } from 'src/app/shared/services/cloud.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { CordovaService } from 'src/app/shared/services/cordova.service';

@Component({
  selector: 'app-id',
  templateUrl: './id.component.html',
  styleUrls: ['./id.component.scss'],
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
export class IdComponent implements OnInit {

	// Variables
	wallets:any;
	ids:any;
	isLoading: boolean = false;
	isWalletsLoading: boolean = true;
	isIDsLoading: boolean = true;

  constructor(
		private nameService: NameService,
		private balanceService: BalanceService,
		private cloudService: CloudService,
		private helperService: HelperService,
		private snackbarService: SnackbarService,
		private cordovaService: CordovaService,
		private clipboard: Clipboard,
	) { }

	createID: FormGroup = new FormGroup({
		name: new FormControl('', {
			validators: [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(20),
				Validators.pattern('^[a-zA-Z0-9]*'),
			],
			asyncValidators: this.nameService.uniqueNameValidator(),
			updateOn: 'blur',
		}),
		label: new FormControl('', [
			Validators.required,
			Validators.minLength(3),
			Validators.maxLength(20),
		]),
		address: new FormControl('', [
			Validators.required,
		]),
		payment: new FormControl('', {
			validators: [
				Validators.required,
			],
			asyncValidators: this.balanceService.checkBalance(),
			updateOn: 'blur'
		})
	});

	getHelperService() {
		return this.helperService;
	}

  ngOnInit(): void {
		this.getWallets();
		this.getIDs();
  }

	getWallets() {
		this.cloudService.getWalletsData().subscribe((data:any) => {
			if (data.result === 'success') {
			let wallet = Object.keys(data.message.wallets).map(key => {
				return {
					address: key,
					balance: data.message.wallets[key].balance
				}
			})
			this.wallets = wallet;
			this.isWalletsLoading = false;
			} else {
				this.snackbarService.openSnackBar('Whoops, something went wrong', 'Dismiss');
			}
		})
	}

	getIDs() {
		this.cloudService.listIDs().subscribe((data:any) => {
			if (data.result === 'success') {
				let ids = Object.keys(data.message).map(key => {
					return {
						address: data.message[key].address,
						label: data.message[key].name,
						id: data.message[key].id
					}
				})
				this.ids = ids;
				this.isIDsLoading = false;
			} else {
				this.snackbarService.openSnackBar('Whoops, something went wrong', 'Dismiss');
			}
		})
	}

	deleteID(id:string, address:string, label:string) {
		this.cloudService.deleteID(id, address, label).subscribe((data:any) => {
			if (data.result === 'success') {
				this.snackbarService.openSnackBar('ID deleted', 'Dismiss');
				setTimeout(() => {
					this.getIDs();
				}, 5000);
			} else {
				this.snackbarService.openSnackBar('Whoops, something went wrong', 'Dismiss');
				setTimeout(() => {
					this.getIDs();
				}, 5000);
			}
		})
	}

	copyID(value: any) {
		if (this.cordovaService.onCordova && (this.cordovaService.device.platform === 'iOS' || this.cordovaService.device.platform === 'Android')) {
			this.clipboard.copy(value);
			this.snackbarService.openSnackBar('ID has been copied to clipboard', 'Dismiss');
		} else if (navigator.clipboard) {
			navigator.clipboard.writeText(value);
			this.snackbarService.openSnackBar('ID has been copied to clipboard', 'Dismiss');
		} else {
			this.snackbarService.openSnackBar('Could not access the clipboard', 'Dismiss');
		}
	}

	updateName(value:any) {
		this.createID.controls.label.patchValue(value);
		this.createID.controls.label.markAsTouched();
	}

	updateAddress(value:any) {
		this.createID.controls.payment.patchValue(value);
		this.createID.controls.payment.markAsTouched();
	}

	submit() {
		if (this.createID.valid) {
			this.isLoading = true;
			this.cloudService.createID(
				this.createID.value.payment.address,
				this.createID.value.address.address,
				this.createID.value.name,
				this.createID.value.label
			).subscribe((data:any) => {
				if (data.result === 'success') {
					this.snackbarService.openSnackBar('Your ID has been successfully created', 'Dismiss');
					this.isLoading = false;
					setTimeout(() => {
						this.getWallets();
						this.getIDs();
					}, 1000);
				} else {
					this.snackbarService.openSnackBar('Whoops, something went wrong', 'Dismiss');
					this.isLoading = false;
					setTimeout(() => {
						this.getWallets();
						this.getIDs();
					}, 1000);
				}
			})
		}
	}

	reset() {
		this.createID.reset();
	}

}
