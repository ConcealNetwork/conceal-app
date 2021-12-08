// Angular Core
import { Injectable } from '@angular/core';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';

// Services
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { CordovaService } from 'src/app/shared/services/cordova.service';

// 3rd Party
import * as moment from 'moment';

@Injectable({
	providedIn: 'root'
})

export class HelperService {

	constructor (
		private snackbarService: SnackbarService,
		private cordovaService: CordovaService,
		private clipboard: Clipboard,
	) { }

	formattedStringAmount(amount:number, currency:string, symbol:string): any {
		const formatOptions = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
		return `${symbol ? symbol : ''} ${amount.toLocaleString('en', formatOptions)} ${currency ? currency : ''} `;
	};

	formatAmount(amount:number, minDec:number, maxDec:number): any {
		const formatOptions = { minimumFractionDigits: minDec, maximumFractionDigits: maxDec };
		return `${amount.toLocaleString('en', formatOptions)}`;
	};

	formatAddress(address:any) {
		return address.slice(0,5) + '...' + address.slice(-5);
	}

	formatDatetime(datetime:Date) {
		return moment(datetime).fromNow(); // eg. 1 day ago, 2 hours ago etc
	}

	getUnlockTime(unlockHeight:number, blockchainHeight:number) {
    let blocksToGo = (unlockHeight - blockchainHeight);
    let minutesToGo = ((blocksToGo * 2) / 60);
    let currentTS = moment();
    let unlockTS = moment(currentTS).add(minutesToGo, 'hours');
    return unlockTS.fromNow(true);
  }

	getUnlockPercent(lockHeight:number, unlockHeight:number, blockchainHeight:number) {
    if (lockHeight >= unlockHeight) {
      return 100;
    } else {
      let blocksToGo = (unlockHeight - blockchainHeight);
      return (100 - Math.round(blocksToGo / (unlockHeight - lockHeight) * 100));
    }
  }

	copyToClipboard(value: any, message: string): void {
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

	formatTypeText(type:string) {
		if (type === 'in') return 'Received';
		if (type === 'out') return 'Sent';
		else return;
	}

}