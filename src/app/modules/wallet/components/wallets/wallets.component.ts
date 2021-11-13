import { Component, OnInit, Input } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

// Services
import { HelperService } from 'src/app/shared/services/helper.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { ApiService } from 'src/app/shared/services/api.service';
import { DataService } from 'src/app/shared/services/data.service';
import { ThemingService } from 'src/app/shared/services/theming.service';

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
					animate('0.2s ease-in', style({ opacity: 1}))
				])
			])
		]),
		trigger('listAnimation', [
			transition('* => *', [ // each time the binding value changes
				query(':enter', [
					style({ opacity: 0 }),
					stagger(100, [
						animate('0.2s', style({ opacity: 1 }))
					])
				], {optional: true})
			])
		])
	]
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
