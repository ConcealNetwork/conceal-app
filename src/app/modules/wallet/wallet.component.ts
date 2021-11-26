// Angular Core
import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

import { CloudService } from './../../shared/services/cloud.service';
import { DataService } from './../../shared/services/data.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
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

export class WalletComponent implements OnInit {

	isDataLoading: boolean = true;

  constructor(
		private cloudService: CloudService,
		private dataService: DataService,
	) {	}

  ngOnInit(): void {
		this.cloudService.getWalletsData().subscribe((data:any) => {
			this.dataService.setWallets(data.message.wallets);
			this.isDataLoading = false;
		})
	}

}
