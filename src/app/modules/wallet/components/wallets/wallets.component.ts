import { Component, OnInit, Input } from '@angular/core';

// Services
import { HelperService } from './../../../../shared/services/helper.service';
import { CloudService } from './../../../../shared/services/cloud.service';

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

  constructor (
		private helperService: HelperService,
		private cloudService: CloudService
	) {
		this.getWalletData();
	}

	getHelperService() {
		return this.helperService;
	}

	getWalletData() {
		this.cloudService.getWalletsData().subscribe((data:any) => {
			this.wallets = data.message.wallets;
			console.log(this.wallets);
		})
	}

  ngOnInit(): void {

  }

}
