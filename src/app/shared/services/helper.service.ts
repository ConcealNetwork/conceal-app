// Angular Core
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// 3rd Party
import * as moment from 'moment';

@Injectable({
	providedIn: 'root'
})

export class HelperService {

	formattedStringAmount(amount:string, currency:string, symbol:string): any {
		const formatOptions = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
		return `${symbol ? symbol : ''} ${parseFloat(amount).toLocaleString('en', formatOptions)} ${currency ? currency : ''} `;
	};

	formatAmount(amount:string, minDec:number, maxDec:number): any {
		const formatOptions = { minimumFractionDigits: minDec, maximumFractionDigits: maxDec };
		return `${parseFloat(amount).toLocaleString('en', formatOptions)}`;
	};

	formatAddress(address:any) {
		return address.slice(0,5) + '...' + address.slice(-5);
	}

	formatDatetime(datetime:Date) {
		return moment(datetime).fromNow(); //eg. 1 day ago, 2 hours ago etc
	}

	formatTypeText(type:string) {
		if (type === 'in') return 'Received';
		if (type === 'out') return 'Sent';
		else { return }
	}

}