import { Component, OnInit, Input } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

// Services
import { HelperService } from './../../../../shared/services/helper.service';
import { DialogService } from './../../../../shared/services/dialog.service';
import { CloudService } from './../../../../shared/services/cloud.service';
import { ApiService } from './../../../../shared/services/api.service';

export interface Wallets {
  item: any;
}

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.scss']
})
export class WalletsComponent implements OnInit {

	@Input() wallets!: Wallets;

	gridColumns: number = 0;
	portfolioCCX: any = 0;
	portfolioBTC: any = 0;
	portfolioUSD: any = 0;

  constructor (
		private helperService: HelperService,
		private dialogService: DialogService,
		private cloudService: CloudService,
		private apiService: ApiService,
		public breakpointObserver: BreakpointObserver
	) {
		this.getWalletData();
	}

	getHelperService() {
		return this.helperService;
	}

	getDialogService() {
		return this.dialogService;
	}

	getWalletData() {
		this.cloudService.getWalletsData().subscribe((data:any) => {
			this.wallets = data.message.wallets;
			this.portfolioCCX = Object.keys(data.message.wallets).reduce((acc, curr) => acc + data.message.wallets[curr].balance + data.message.wallets[curr].locked || acc, 0);
			this.apiService.getPrice('btc').subscribe((data:any) => {
				let priceBTC = data.conceal.btc;
				this.portfolioBTC = (priceBTC * this.portfolioCCX);
			})
			this.apiService.getPrice('usd').subscribe((data:any) => {
				let priceUSD = data.conceal.usd;
				this.portfolioUSD = (priceUSD * this.portfolioCCX);
			})
			console.log(this.wallets);
		})
	}

  ngOnInit(): void {
		this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
		.subscribe((state: BreakpointState) => {
			if (state.matches) {
				this.gridColumns = 1;
				console.log('Breakpoint: Small', this.gridColumns);
			}
		});
		this.breakpointObserver.observe([Breakpoints.Medium])
		.subscribe((state: BreakpointState) => {
			if (state.matches) {
				this.gridColumns = 3;
				console.log('Breakpoint: Medium', this.gridColumns);
			}
		});
		this.breakpointObserver.observe([Breakpoints.Large])
		.subscribe((state: BreakpointState) => {
			if (state.matches) {
				this.gridColumns = 3;
				console.log('Breakpoint: Large', this.gridColumns);
			}
		});
		this.breakpointObserver.observe([Breakpoints.XLarge])
		.subscribe((state: BreakpointState) => {
			if (state.matches) {
				this.gridColumns = 3;
				console.log('Breakpoint: XLarge', this.gridColumns);
			}
		});
  }

}
