import { Component, OnInit, Input } from '@angular/core';

// Services
import { HelperService } from './../../../../shared/services/helper.service';
import { DialogService } from './../../../../shared/services/dialog.service';
import { ApiService } from './../../../../shared/services/api.service';
import { DataService } from './../../../../shared/services/data.service';
import { ThemingService } from './../../../../shared/services/theming.service';

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

	portfolioCCX: any = 0;
	portfolioBTC: any = 0;
	portfolioUSD: any = 0;

  constructor (
		private helperService: HelperService,
		private dialogService: DialogService,
		private apiService: ApiService,
		private dataService: DataService,
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
			this.portfolioCCX = Object.keys(wallets).reduce((acc, curr) => acc + wallets[curr].balance + wallets[curr].locked || acc, 0);
			this.apiService.getPrice('btc').subscribe((price:any) => {
				this.portfolioBTC = (price.conceal.btc * this.portfolioCCX);
			})
			this.apiService.getPrice('usd').subscribe((price:any) => {
				this.portfolioUSD = (price.conceal.usd * this.portfolioCCX);
			})
		})
  }

}
