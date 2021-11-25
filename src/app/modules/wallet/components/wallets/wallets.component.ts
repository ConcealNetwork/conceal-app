// App Variables
import { environment } from 'src/environments/environment';

// Angular Core
import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

// Services
import { ThemingService } from 'src/app/shared/services/theming.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { DataService } from 'src/app/shared/services/data.service';
import { CloudService } from 'src/app/shared/services/cloud.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

export interface Wallets {
  item: any;
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
		]),
		trigger('listAnimation', [
			transition('* => *', [ // each time the binding value changes
				query(':enter', [
					style({ opacity: 0 }),
					stagger(100, [
						animate('0.4s', style({ opacity: 1 }))
					])
				], {optional: true})
			])
		])
	]
})
export class WalletsComponent implements OnInit {

	@Input() wallets!: Wallets;

	isLoading: boolean = false;
	activeWallets: number = 0;
	activeWalletsLimit: number = environment.walletLimit;
	portfolioCCX: any = 0;
	portfolioBTC: any = 0;
	portfolioUSD: any = 0;

  constructor (
		private helperService: HelperService,
		private dialogService: DialogService,
		private snackbarService: SnackbarService,
		private apiService: ApiService,
		private dataService: DataService,
		private cloudService: CloudService,
		private themingService: ThemingService,
	) {}

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
		this.dataService.wallets$.subscribe((wallets:any) => {
			this.wallets = wallets;
			if(this.wallets) {
				this.activeWallets = Object.keys(this.wallets).length;
				this.portfolioCCX = Object.keys(wallets).reduce((acc, curr) => acc + wallets[curr].balance + wallets[curr].locked || acc, 0);
			}
			this.apiService.getPrice('btc').subscribe((price:any) => {
				this.portfolioBTC = (price.conceal.btc * this.portfolioCCX);
			})
			this.apiService.getPrice('usd').subscribe((price:any) => {
				this.portfolioUSD = (price.conceal.usd * this.portfolioCCX);
			})
		})
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

}
