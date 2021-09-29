// Angular Core
import { Injectable } from '@angular/core';

// 3rd Party Modules
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  // Observable string sources
  private authType = new Subject<string>();
  // Observable string streams
  authTypeAnnounce$ = this.authType.asObservable();
  // Service message commands
  announceAuthType(type: string) {
    this.authType.next(type);
  }

	// Transactions
	public wallets = new Subject<string>();
	wallets$ = this.wallets.asObservable();
	getWallets(wallet: any) {
		this.wallets.next(wallet);
	}

	// Transactions
	public transactions = new Subject<string>();
	transactions$ = this.transactions.asObservable();
	getTransactions(transaction: any) {
		this.transactions.next(transaction);
	}

}