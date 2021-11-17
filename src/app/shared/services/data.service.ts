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

	// Wallets
	private wallets = new Subject<string>();
	wallets$ = this.wallets.asObservable();
	setWallets(wallets: any) {
		this.wallets.next(wallets);
	}

}