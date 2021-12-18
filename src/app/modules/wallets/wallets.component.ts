// App Variables
import { environment } from 'src/environments/environment';

// Angular Core
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

// Angular Material
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';

// Services
import { ThemingService } from 'src/app/shared/services/theming.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { DataService } from 'src/app/shared/services/data.service';
import { CloudService } from 'src/app/shared/services/cloud.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { CordovaService } from 'src/app/shared/services/cordova.service';

export interface Transactions {
	type: string;
	status: string;
	amount: number;
	fee: number;
	timestamp: string;
	address: string;
	hash: string;
}

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.scss'],
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

export class WalletsComponent implements OnInit {

	@ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;

	// status
	interval: number = 60000;
	isLoading: boolean = false;
	isDataLoading: boolean = true;
	isLoadingBTC: boolean = true;
	isLoadingFiat: boolean = true;
	isLoadingResults: boolean = true;
	isSmallScreen: boolean = false;

	// variables
	transactions: any = [];
	wallets: any = [];
	walletLimit: number = environment.walletLimit;
	currency: any = environment.currency;
	activeWallets: number = 0;
	portfolioCCX: number = 0;
	portfolioBTC: number = 0;
	portfolioFiat: number = 0;

	// tables
	pageEvent!: PageEvent;
	pageSize: number = 10;
	pageSizeOptions: number[] = [5, 10, 25, 100];
	displayedColumns: string[] = ['timestamp', 'type', 'amount'];
	dataSource!: MatTableDataSource<Transactions>;

  constructor(
		private helperService: HelperService,
		private dialogService: DialogService,
		private snackbarService: SnackbarService,
		private apiService: ApiService,
		private dataService: DataService,
		private cloudService: CloudService,
		private themingService: ThemingService,
		private cordovaService: CordovaService,
		private clipboard: Clipboard,
		public breakpointObserver: BreakpointObserver,
		private changeDetectorRefs: ChangeDetectorRef,
	) {	}

	getHelperService() {
		return this.helperService;
	}

	getDialogService() {
		return this.dialogService;
	}

	getThemingService() {
		return this.themingService;
	}

  ngOnInit(): void {
		// set currency if local storage is not empty
		if (localStorage.getItem('currency') !== null) {
			this.currency = localStorage.getItem('currency');
		}
		// breakpoints
		let breakpoints = (resolve:any) => {
			this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall]).subscribe((state: BreakpointState) => {
				if (state.matches) {
					// Matches small viewport or handset in portrait mode
					this.isSmallScreen = true;
					this.pageSize = 5;
					this.displayedColumns = ['timestamp', 'type', 'amount'];
				} else {
					this.isSmallScreen = false;
					this.pageSize = 10;
					this.displayedColumns = ['timestamp', 'type', 'amount', 'address', 'fee', 'status'];
				}
			})
			resolve();
		};
		// wallets
		let wallets = (resolve:any) => {
			this.cloudService.getWalletsData().subscribe((data:any) => {
				if (data && data.result === 'success') {
					// convert object to array with key as address
					let wallet = Object.keys(data.message.wallets).map(key => {
						return {
							address: key,
							balance: data.message.wallets[key].balance,
							locked: data.message.wallets[key].locked,
							total: data.message.wallets[key].total,
							corrupted: data.message.wallets[key].corrupted,
							ipn: data.message.wallets[key].ipn,
							transactions: data.message.wallets[key].transactions
						}
					})
					this.wallets = wallet;
					this.activeWallets = wallet.length;
					this.portfolioCCX = 0;
					this.transactions = [];
					for (let i = 0; i < this.wallets.length; i++) {
						this.portfolioCCX += this.wallets[i].balance;
						this.transactions = this.wallets[i].transactions.concat(this.transactions);
					}
					this.apiService.getPrice(this.currency).subscribe((price:any) => {
						if (price.conceal) {
							this.portfolioFiat = (price.conceal[(this.currency)] * this.portfolioCCX);
							this.portfolioBTC = (price.conceal.btc * this.portfolioCCX);
							this.isLoadingFiat = false;
							this.isLoadingBTC = false;
						} else {
							this.isLoadingFiat = false;
							this.isLoadingBTC = false;
							this.snackbarService.openSnackBar('Could not get the latest market price', 'Dismiss');
						}
					})
					if (this.isLoadingBTC && this.isLoadingFiat) {
						this.dataSource = new MatTableDataSource(this.transactions);
						this.isDataLoading = false;
						// Assign the data to the data source for the table to render
						setTimeout(() => {
							console.log('Refresh:table');
							this.dataSource.paginator = this.paginator;
							this.dataSource.sort = this.sort;
							this.changeDetectorRefs.detectChanges();
							this.isLoadingResults = false;
						}, 500);
					}
				} else {
					this.isDataLoading = false;
					this.isLoadingResults = false;
					if (data) {
						this.snackbarService.openSnackBar(data.message, 'Dismiss');
					} else {
						this.snackbarService.openSnackBar('Could not retrieve wallet data', 'Dismiss');
					}
				}
			})
			resolve();
		};
		// repeat promise at set intervals
		Promise.all([new Promise(breakpoints), new Promise(wallets)]).then(() => {
			let interval = this.interval;
			let callback = function() {
				Promise.all([new Promise(breakpoints), new Promise(wallets)]).then(function(){
					console.log('Refresh:data');
					setTimeout(callback, interval);
				});
			};
			setTimeout(callback, interval);
			// refresh table
			setInterval(() => {
				this.refresh()
			}, interval+500);
		})
	}

	refresh() {
		console.log('Refresh:table');
		this.dataSource = new MatTableDataSource(this.transactions);
		this.dataSource.paginator = this.paginator;
		this.dataSource.sort = this.sort;
		this.changeDetectorRefs.detectChanges();
		this.isLoading = false;
	}

	deleteWallet(wallet:string, balance:number) {
		this.isLoading = true;
		if (balance < 1) {
			this.cloudService.deleteWallet(wallet).subscribe((data:any) => {
				if (data.result === 'success') {
					this.snackbarService.openSnackBar('Wallet deleted', 'Dismiss');
					this.cloudService.getWalletsData().subscribe((data:any) => {
						this.dataService.setWallets(data.message.wallets);
					})
					this.isLoading = false;
				} else {
					this.snackbarService.openSnackBar(data.message, 'Dismiss');
					this.isLoading = false;
				}
			})
		} else {
			this.snackbarService.openSnackBar('Wallet not empty: Remove funds first', 'Dismiss');
			this.isLoading = false;
		}
	}

	createWallet() {
		this.isLoading = true;
		this.cloudService.createWallet().subscribe((data:any) => {
			if (data.result === 'success') {
				this.snackbarService.openSnackBar('Wallet created', 'Dismiss');
				this.cloudService.getWalletsData().subscribe((data:any) => {
					this.dataService.setWallets(data.message.wallets);
				})
				this.isLoading = false;
			} else {
				this.snackbarService.openSnackBar(data.message, 'Dismiss');
				this.isLoading = false;
			}
		})
	}

	applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

	copy(value: any, message: string): void {
		if (this.cordovaService.onCordova && (this.cordovaService.device.platform === 'iOS' || this.cordovaService.device.platform === 'Android')) {
			this.clipboard.copy(value);
			this.snackbarService.openSnackBar(message, 'Dismiss');
		} else if (navigator.clipboard) {
			navigator.clipboard.writeText(value);
			this.snackbarService.openSnackBar(message, 'Dismiss');
		} else {
			this.snackbarService.openSnackBar('Could not access the clipboard', 'Dismiss');
		}
	}

	openExplorer(hash:string) {
		window.open("https://explorer.conceal.network/index.html?hash=" + hash + "#blockchain_transaction", '_blank');
	}

}
