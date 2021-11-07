// Angular Core
import { Component, OnInit } from '@angular/core';

import { CloudService } from './../../shared/services/cloud.service';
import { DataService } from './../../shared/services/data.service';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss'],
})

export class WalletComponent implements OnInit {

  constructor(
		private cloudService: CloudService,
		private dataService: DataService,
	) {	}

  ngOnInit(): void {
		this.cloudService.getWalletsData().subscribe((data:any) => {
			this.dataService.setWallets(data.message.wallets);
		})
	}

}
