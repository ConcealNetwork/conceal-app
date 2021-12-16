// App Variables
import { environment } from 'src/environments/environment';

// Angular Core
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

// Angular Material
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// RxJs
import { debounceTime } from 'rxjs/operators';

// Services
import { ThemingService } from 'src/app/shared/services/theming.service';
import { CloudService } from 'src/app/shared/services/cloud.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { CordovaService } from 'src/app/shared/services/cordova.service';

export interface Deposits {
	address: string;
	amount: number;
	creatingTransactionHash: string;
	depositId: number;
	height: number;
	interest: number;
	locked: boolean;
	spendingTransactionHash: string;
	term: number;
	timestamp: string;
	unlockHeight: number;
}

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
	@ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;

	// Variables
	isLoadingResults: boolean = true;
	isSmallScreen: boolean = false;
	isDataLoading: boolean = true;
	isUnlocking: boolean = false;
	showSlider: boolean = true;
	walletsLoading: boolean = true;
	depositsLoading: boolean = true;
	interestRates: any = environment.interestRates;
	wallets: any = [];
	deposits: any = [];
	selectedWallet: any;
	termLength: number = 0;
	blockchainHeight: number = 0;
	interest: any = 0;
	rate: any = 0;

	// Tables
	pageEvent!: PageEvent;
	pageSize: number = 10;
	pageSizeOptions: number[] = [5, 10, 25, 100];
	displayedColumns: string[] = ['timestamp', 'type', 'amount'];
	dataSource!: MatTableDataSource<Deposits>;

	deposit: FormGroup = new FormGroup({
		wallet: new FormControl('', [
			Validators.required,
			Validators.minLength(98),
			Validators.maxLength(98),
		]),
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
		private changeDetectorRefs: ChangeDetectorRef,
		public breakpointObserver: BreakpointObserver,
		private themingService: ThemingService,
		private cloudService: CloudService,
		private helperService: HelperService,
		private dialogService: DialogService,
		private snackbarService: SnackbarService,
		private cordovaService: CordovaService,
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

  ngOnInit(): void {
		if (this.cordovaService.onCordova && (this.cordovaService.device.platform === 'Android')) {
			this.showSlider = false;
		}
		// breakpoints
		let breakpoints = this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe((state: BreakpointState) => {
			if (state.matches) {
				// Matches small viewport or handset in portrait mode
				this.isSmallScreen = true;
				this.pageSize = 5;
				this.displayedColumns = [
					'timestamp',
					'term',
					'locked',
				];
			} else {
				this.isSmallScreen = false;
				this.pageSize = 10;
				this.displayedColumns = [
					'timestamp',
					'term',
					'locked',
					'address',
					'amount',
					'interest',
				];
			}
		})
		// subscribe to wallets
		let wallets = this.cloudService.getWalletsData().subscribe((data:any) => {
			if (data && data.result === 'success') {
				this.wallets = data.message.wallets;
				this.blockchainHeight = data.message.height;
				this.walletsLoading = false;
				this.deposit.valueChanges.pipe(debounceTime(500)).subscribe(() => {
					if (this.deposit.controls.term.value && this.deposit.controls.amount.value) {
						this.interest = this.getDepositInterest(this.deposit.controls.amount.value, this.termLength);
						this.rate = this.getDepositRate(this.deposit.controls.amount.value, this.termLength);
					}
				})
			} else {
				this.walletsLoading = false;
				if (data) {
					this.snackbarService.openSnackBar(data.message, 'Dismiss');
				} else {
					this.snackbarService.openSnackBar('Could not retrieve wallet data', 'Dismiss');
				}
			}
		})
		// subscribe to deposits
		let deposits = this.cloudService.listDeposits().subscribe((data:any) => {
			if (data && data.result === 'success') {
				// loop through results and check if address exists in deposit
				for (let i = 0; i < data.message.deposits.length; i++) {
					if (data.message.deposits[i].address) {
						this.deposits.push(data.message.deposits[i]);
					}
				}
				this.dataSource = new MatTableDataSource(this.deposits);
				this.depositsLoading = false;
				this.isDataLoading = false;
				// Assign the data to the data source for the table to render
				setTimeout(() => {
					this.dataSource.paginator = this.paginator;
					this.dataSource.sort = this.sort;
					this.changeDetectorRefs.detectChanges();
					this.isLoadingResults = false;
				}, 500);
			} else {
				this.depositsLoading = false;
				this.isDataLoading = false;
				this.isLoadingResults = false;
				if (data) {
					this.snackbarService.openSnackBar(data.message, 'Dismiss');
				} else {
					this.snackbarService.openSnackBar('Could not retrieve deposits data', 'Dismiss');
				}
			}
		})
		// call wallets and deposits
		Promise.all([wallets, deposits, breakpoints]);
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

	unlock(id:number) {
		if(id) {
			this.isUnlocking = true;
			this.cloudService.unlockDeposit(id).subscribe((data:any) => {
				if (data && data.result === 'success') {
					this.snackbarService.openSnackBar('Deposit unlocked', 'Dismiss');
					this.dialogService.openPendingDialog();
					this.isUnlocking = false;
				} else {
					this.snackbarService.openSnackBar('Could not unlock this deposit', 'Dismiss');
					this.isUnlocking = false;
				}
			})
		}
	}

	// return the correct interest rate percent from the 2D table
	getDepositInterest(amount: number, duration: number) {
		return (this.interestRates[duration - 1][Math.min(Math.floor(amount / 10000), 2)] * amount / 100).toFixed(6);
	}

	// return the correct interest rate from the 2D table
	getDepositRate(amount: number, duration: number) {
		return (this.interestRates[duration - 1][Math.min(Math.floor(amount / 10000), 2)].toFixed(2));
	}

	applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}