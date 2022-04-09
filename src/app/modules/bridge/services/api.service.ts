import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

// Services
import { DataService } from './data.service';

@Injectable({
	providedIn: 'root'
})

export class APIService implements Resolve<any> {

	env = environment;

	httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

	constructor(
		private http: HttpClient,
		private dataService: DataService
	) { }

	resolve() {
		return this.http.get(`${this.env.api}/${this.dataService.apiPath}/config/chain`);
	}

	// get the estimated amount of ETH for paying gas price later
	async estimateGasPrice(amount: number) {
		let body = { amount }
		return await this.http.post(`${this.env.api}/${this.dataService.apiPath}/api/ccx/wccx/estimateGas`, JSON.stringify(body), this.httpHeader).toPromise();
  }

	// get the actual price of the gas for the current network
	async getGasPrice() {
		return await this.http.get(`${this.env.api}/${this.dataService.apiPath}/api/ccx/wccx/getGasPrice`).toPromise();
	}

	// Send CCX
	sendCCX(email: string, amount: number, toAddress: string, fromAddress: string, txfeehash: string): any {
		if(!email) email = '';
		const body = {
			email, amount, toAddress, fromAddress, txfeehash
		};
		console.log(body);
		return this.http.post(`${this.env.api}/${this.dataService.apiPath}/api/ccx/wccx/swap/init`, JSON.stringify(body), this.httpHeader).pipe(
			retry(5),
			catchError(this.processError)
		)
	}

	// Send wCCX
	sendWCCX(fromAddress: string, toAddress: string, txHash: string, amount: number, email: string): any {
		if(!email) email = '';
		const body = {
			fromAddress, toAddress, txHash, email
		};
		console.log(body);
		return this.http.post(`${this.env.api}/${this.dataService.apiPath}/api/wccx/ccx/swap/init`, JSON.stringify(body), this.httpHeader).pipe(
			retry(5),
			catchError(this.processError)
		)
	}

	// Exec Swap
	execSwap(paymentId: string, email: string): any {
		if(!email) email = '';
		const body = {
			paymentId, email
		};
		return this.http.post(`${this.env.api}/${this.dataService.apiPath}/api/wccx/ccx/swap/exec`, JSON.stringify(body), this.httpHeader).pipe(
			retry(5),
			catchError(this.processError)
		)
	}

	// Check Swap Transactions
	async checkSwapState(direction: string, paymentId: string) {
		let body = { paymentId }
		if (direction == 'wccx') {
			return await this.http.post(`${this.env.api}/${this.dataService.apiPath}/api/ccx/wccx/tx`, JSON.stringify(body), this.httpHeader).toPromise();
		} else if (direction == 'ccx') {
			return await this.http.post(`${this.env.api}/${this.dataService.apiPath}/api/wccx/ccx/tx`, JSON.stringify(body), this.httpHeader).toPromise();
		} else {
			return false;
		}
	}

	// Check CCX Balance
	async getCCXSwapBalance() {
		return await this.http.get(`${this.env.api}/${this.dataService.apiPath}/api/balance/ccx`).toPromise();
  }

	// Fetch Balance
	async fetchCCXSwapBalance() {
		let balance: any = await this.getCCXSwapBalance();
		this.dataService.ccxSwapBalance = balance.balance;
	}

	// Check WCCX Balance
	async getWCCXSwapBalance() {
		return await this.http.get(`${this.env.api}/${this.dataService.apiPath}/api/balance/wccx`).toPromise();
  }

	// Fetch Balance
	async fetchWCCXSwapBalance() {
		let balance: any = await this.getWCCXSwapBalance();
		this.dataService.wccxSwapBalance = balance.balance;
	}

	processError(err: any) {
		let message = '';
		if(err.error instanceof ErrorEvent) {
		 message = err.error.message;
		} else {
		 message = `Error Code: ${err.status}\nMessage: ${err.message}`;
		}
		//console.log(message);
		return throwError(message);
 	}

}