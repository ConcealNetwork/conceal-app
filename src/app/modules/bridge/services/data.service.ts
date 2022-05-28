// Angular Core
import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class DataService {

  paymentIdChange: BehaviorSubject<string> = new BehaviorSubject("");
 	chainIdChange: BehaviorSubject<string> = new BehaviorSubject("");

  setPaymentId(paymentId:any) {
    this.paymentIdChange.next(paymentId);
  }

	setChainId(id:string) {
		this.chainIdChange.next(id);
	}

	// common config data
	apiPath: string = '';

	maxSwapAmount: number = 0;
	minSwapAmount: number = 0;

	// wccx config data
	wccxAccountAddress: string = '';
	chainId: number = 0;
	confirmations: number = 0;
	contractAddress: string = '';
	contractAbi: any;
	provider: string = '';
	wccxUnits: number = 0;
	gasMultiplier: any;

	// ccx config data
	ccxAccountAddress: string = '';
	ccxUnits: number = 0;

	// app data
	loading: boolean = false;
	step: number = 0;
	stepCompleted: boolean = false;

	// swap data
	account: string = '';
	ccxSwapBalance: number = 0;
	wccxSwapBalance: number = 0;
	address: string = '';
	paymentId: string = '';

	// receipt data
	txAmount: number = 0;
	txWallet: string = '';
	txHash1: string = '';
	txHash2: string = '';

	// wallet data
	isWalletConnected: boolean = false;
	isWalletNetworkConnected: boolean = false;

}