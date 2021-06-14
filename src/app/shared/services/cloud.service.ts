import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
	providedIn: 'root'
})

export class CloudService {

	api = environment.walletAPI;

	constructor(private http: HttpClient) { }

	check2FA() {
		return this.http.get(`${this.api}/two-factor-authentication/enabled`);
  };

	getWalletsData() {
		return this.http.get(`${this.api}/wallet/unified`);
	};

	getDeposits() {
		return this.http.get(`${this.api}/deposits/list`);
	}

	getWalletKeys(address: string, code: string) {
		return this.http.get(`${this.api}/wallet/keys?address=${address}&code=${code}`);
	};

	getMessages() {
    return this.http.get(`${this.api}/wallet/messages`);
	};

	sendMessage(address: string, message: string, wallet:string, code:string, password: string) {
		const body = {
			address, message, wallet, code, password
		};
		return this.http.post(`${this.api}/wallet/send-message`, JSON.stringify(body));
	};

	getContacts() {
    return this.http.get(`${this.api}/user`);
	};

	getUser() {
    return this.http.get(`${this.api}/user`);
	};

	addContact(label: string, address:string, paymentID:string, entryID=null, edit=false) {
		const body = {
			label, address, paymentID, entryID, edit
		};
		return this.http.post(`${this.api}/address-book`, JSON.stringify(body));
	}

	deleteContact(entryID:string) {
		return this.http.delete(`${this.api}/address-book/delete/entryID/${entryID}`);
	}

	deleteWallet(address:string) {
		return this.http.delete(`${this.api}/wallet?address=${address}`);
	};

	createWallet() {
		return this.http.post(`${this.api}/wallet`, null);
	};

	importWallet(privateSpendKey:string) {
		privateSpendKey = JSON.stringify({ privateSpendKey });
		return this.http.post(`${this.api}/wallet/import`, privateSpendKey);
	};

	createTransaction(amount:number, wallet:string, address:string, paymentID:string, message:string, code:string, password:string) {
		let client = '';
		let ref = '';
		if(!message) message = '';
		if(!paymentID) paymentID = '';
    let body = {
      amount: amount,
			wallet,  		// origin
			address,  	// destination
			paymentID, 	// destination ID
			message, 		// message
			code,				// 2FA code
			password,		// password
			client,			// Client not used
			ref					// Ref not used
		};
		return this.http.put(`${this.api}/wallet`, JSON.stringify(body));
  };

}