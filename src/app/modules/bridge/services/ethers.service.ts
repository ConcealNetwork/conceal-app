// Angular
import { Injectable } from '@angular/core';

// Services
import { APIService } from './api.service';
import { DataService } from './data.service';
import { DialogService } from './dialog.service';
import { SnackbarService } from './snackbar.service';

// 3rd Party
import { ethers } from 'ethers'

declare const window: any;

@Injectable({
	providedIn: 'root'
})

export class EthersService {

	constructor(
		private apiService: APIService,
		private dataService: DataService,
		private dialogService: DialogService,
		private snackbarService: SnackbarService
	) { }

	async addCustomChains(chainId:string, chainName:string, name:string, symbol:string, decimals:number, rpcUrls:string, blockExplorerUrls:string) {
		const params = [{
			chainId: chainId,
			chainName: chainName,
			nativeCurrency: {
				name: name,
				symbol: symbol,
				decimals: decimals
			},
			rpcUrls: [rpcUrls],
			blockExplorerUrls: [blockExplorerUrls]
		}];
		try {
			// wasAdded is a boolean. Like any RPC method, an error may be thrown.
			const wasAdded = await window.ethereum.request({ method: 'wallet_addEthereumChain', params })
			if (wasAdded) {
				this.snackbarService.openSnackBar('Custom network successfully added', 'Dismiss');
			}
		} catch (error:any) {
			console.log(error.message);
		}
	}

	async switchEthereumChain(chainId: string) {
		const params = [{
			chainId: chainId,
		}];
		try {
			// wasAdded is a boolean. Like any RPC method, an error may be thrown.
			const test = await window.ethereum.request({ method: 'wallet_switchEthereumChain', params })
			if (test) {
				this.snackbarService.openSnackBar('Custom network successfully added', 'Dismiss');
			}
		} catch (error:any) {
			console.log(error.message);
		}
	}

	async addWCCXToken(tokenAddress: string) {
		const tokenSymbol = 'wCCX';
		const tokenDecimals = 6;
		const tokenImage = 'https://conceal.network/images/branding/team-64x64.png';
		try {
			// wasAdded is a boolean. Like any RPC method, an error may be thrown.
			const wasAdded = await window.ethereum.request({
				method: 'wallet_watchAsset',
				params: {
					type: 'ERC20', // Initially only supports ERC20, but eventually more!
					options: {
						address: tokenAddress, // The address that the token is at.
						symbol: tokenSymbol, // A ticker symbol or shorthand, up to 5 chars.
						decimals: tokenDecimals, // The number of decimals in the token
						image: tokenImage, // A string url of the token logo
					},
				},
			});
			if (wasAdded) {
				this.snackbarService.openSnackBar('Token successfully added', 'Dismiss');
			} else {
				this.snackbarService.openSnackBar('Token was not added', 'Dismiss');
			}
		} catch (error:any) {
			this.snackbarService.openSnackBar(error.message, 'Dismiss');
		}
	}

	// Check for MetaMask
	checkMetaMask() {
		if (typeof window.ethereum !== 'undefined') {
			// if found connect to MetaMask
			this.connectMetamask();
			this.snackbarService.openSnackBar('Wallet Detected!', 'Dismiss');
		} else {
			// if not found open dialog
			this.dialogService.openMetaMaskDialog();
		}
	}

	// Connect to MetaMask and get account
	async connectMetamask() {
		let accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
		if (accounts) {
			this.dataService.account = accounts[0];
			// this.checkChainId();
			// this.dataService.isWalletConnected = true;
			this.snackbarService.openSnackBar('Wallet Connected!', 'Dismiss');
		} else {
			this.snackbarService.openSnackBar('Could not detect your address', 'Dismiss');
		}
	}

	/**********************************************************/
	/* Handle chain (network) and chainChanged (per EIP-1193) */
	/**********************************************************/
	checkChainId() {
		if (typeof window.ethereum !== 'undefined') {
			let chainId = window.ethereum.request({ method: 'eth_chainId' });
			this.dataService.setChainId(chainId); // Store the chainId
			this.dataService.isWalletNetworkConnected = true; // Set the network connection status
		} else {
			// if not found open dialog
			this.dialogService.openMetaMaskDialog();
		}
	}

	// Ethers Swap Functions
	async sendGasFeePayment(email: string, amount: any, toAddress: string, fromAddress: string) {

		// Open Dialog & Loading = true
		this.dataService.loading = true;

		// Setup Ethers
		let provider = new ethers.providers.Web3Provider(window.ethereum);
		let signer = provider.getSigner();

		// Check if we are on the same network
		if (parseInt(window.ethereum.chainId) !== this.dataService.chainId) {
			this.dataService.loading = false;
			this.snackbarService.openSnackBar('You need to be on the ' + this.dataService.provider + ' network', 'Dismiss');
			return false;
		}

		// Check swap balance
		let balance: any = await this.apiService.getWCCXSwapBalance();

		// If balance is available continue
		if (balance.result) {

			// If balance is less then amount warn
			if (balance.balance < parseFloat(amount)) {
				this.snackbarService.openSnackBar('Not enough wCCX available for the swap', 'Dismiss');
				this.dataService.loading = false;
				return false;

			// If balance is equal or grater then amount continue
			} else if (balance.balance >= parseFloat(amount)) {

				// Get the Gas Price
				this.snackbarService.openSnackBar('Checking the gas price...', 'Dismiss');

				// get the estimated amount of ETH for paying gas price later
				let estimatedGas: any = await this.apiService.estimateGasPrice(amount);

				// get the actual price of the gas for the current network
				let gasPrice: any = await this.apiService.getGasPrice();

				// Set Gas Fee
				const txGasFee = {
					value: ethers.utils.parseEther(estimatedGas.gas.toString()),
					to: this.dataService.wccxAccountAddress,
					chainId: this.dataService.chainId,
					gasPrice: gasPrice.gas
				};

				this.dialogService.openTransactionDialog();

				// Send the actual tx using the signer as sender
				let txResult: any = await signer.sendTransaction(txGasFee).then((response) => {
					return response;
				}, (error: any) => {
					this.dialogService.closeDialogs();
					this.snackbarService.openSnackBar(error.message, 'Dismiss');
					this.dataService.loading = false;
					return false;
				});

				// Wait for the specified number of transaction confirmations
				let receipt = await txResult.wait(this.dataService.confirmations);

				this.apiService.sendCCX(email, amount, toAddress, fromAddress, txResult.hash).subscribe((response: any) => {
					if (response.success) {
						this.dataService.loading = false;
						this.dataService.paymentId = response.paymentId; // Store the payment id
						this.dataService.setPaymentId(response.paymentId); // Store the payment id
						this.dataService.step = 1;
						this.dataService.stepCompleted = true;
						this.dialogService.closeDialogs();
						this.snackbarService.openSnackBar('Gas Payment Accepted!', 'Dismiss');
						this.checkSwapTransaction('wccx', response.paymentId);
					} else {
						this.dataService.loading = false;
						this.dialogService.closeDialogs();
						this.snackbarService.openSnackBar('Whoops, there was a problem!', 'Dismiss');
						console.log(receipt);
						return false;
					}
					return true;
				})

			// Could not retrieve balance so warn
			} else {
				this.snackbarService.openSnackBar('Could not retrieve the swap balance', 'Dismiss');
				this.dataService.loading = false;
				return false;
			}

		// Could not retrieve balance so warn
		} else {
			this.snackbarService.openSnackBar('Could not retrieve the swap balance', 'Dismiss');
			this.dataService.loading = false;
			return false;
		}

		return true;

	}

	async sendwCCXDeposit(email: string, amount: any, toAddress: string, fromAddress: string) {

		// Open Dialog & Loading = true
		this.dataService.loading = true;

		// Setup Ethers
		let provider = new ethers.providers.Web3Provider(window.ethereum);
		let signer = provider.getSigner();

		// Check if we are on the same network
		if (parseInt(window.ethereum.chainId) !== this.dataService.chainId) {
			this.dataService.loading = false;
			this.snackbarService.openSnackBar('You need to be on the ' + this.dataService.provider + ' network', 'Dismiss');
			return false;
		}

		// Create the contract with the metamask user as the signer
		this.snackbarService.openSnackBar('Making Deposit...', 'Dismiss');
		let contract = new ethers.Contract(this.dataService.contractAddress, this.dataService.contractAbi, signer);

		// Check swap balance
		let balance: any = await this.apiService.getCCXSwapBalance();

		// If balance is available continue
		if (balance.result) {

			// If balance is less then amount warn
			if (balance.balance < parseFloat(amount)) {
				this.snackbarService.openSnackBar('Not enough CCX available for the swap', 'Dismiss');
				this.dataService.loading = false;
				return false;

			// If balance is equal or grater then amount continue
			} else if (balance.balance >= parseFloat(amount)) {

			let gasResult: any = await this.apiService.getGasPrice();

			var options = {
				gasPrice: gasResult.gas
			};

      // Call the transfer contract and initialize the TX then wait for the TX to be confirmed before finalizing it
      let txResult: any = await contract.transfer(this.dataService.wccxAccountAddress, parseFloat(amount) * this.dataService.wccxUnits, options).then((response: any) => {
				return response;
			}, (error: any) => {
				this.snackbarService.openSnackBar(error.message, 'Dismiss');
				this.dataService.loading = false;
				return false;
			});

			// Wait for confirmations
			let receipt = await txResult.wait(this.dataService.confirmations);

			this.apiService.sendWCCX(fromAddress, toAddress, txResult.hash, amount, email).subscribe((response: any) => {
				if (response.success) {
					this.dataService.paymentId = response.paymentId; // Store the paymentId
					// Execute swap
					this.apiService.execSwap(response.paymentId, email).subscribe((response: any) => {
						if (response.success) {
							this.dataService.loading = false;
							this.dataService.step = 1;
							this.dataService.stepCompleted = true;
							this.snackbarService.openSnackBar('Deposit Accepted!', 'Dismiss');
							this.checkSwapTransaction('ccx', this.dataService.paymentId);
						} else {
							this.dataService.loading = false;
							this.snackbarService.openSnackBar(response.error, 'Dismiss');
							console.log(receipt);
							return false;
						}
						return true;
					})

				} else {
					this.dataService.loading = false;
					this.dialogService.closeDialogs();
					this.snackbarService.openSnackBar('Whoops, there was a problem!', 'Dismiss');
					console.log(receipt);
					return false;
				}
				return true;
			})

			// Could not retrieve balance so warn
			} else {
				this.snackbarService.openSnackBar('Could not retrieve the swap balance', 'Dismiss');
				this.dataService.loading = false;
				return false;
			}

		// Could not retrieve balance so warn
		} else {
			this.snackbarService.openSnackBar('Could not retrieve the swap balance', 'Dismiss');
			this.dataService.loading = false;
			return false;
		}

		return true;

	}

	async checkSwapTransaction(direction:string, paymentId:string) {
		let result: any = await this.apiService.checkSwapState(direction, paymentId);
		if (result.result) {
			this.dataService.step = 2;
			this.dataService.txAmount = result.txdata.swaped;
			this.dataService.txWallet = result.txdata.address;
			this.dataService.txHash1 = result.txdata.swapHash;
			this.dataService.txHash2 = result.txdata.depositHash;
			this.snackbarService.openSnackBar('Payment Received!', 'Dismiss');
		} else if (!result.result) {
			// add 10s delay before retying
			await new Promise(resolve => setTimeout(resolve, 10000));
			this.checkSwapTransaction(direction, paymentId);
		} else {
			this.snackbarService.openSnackBar('Payment Failed!', 'Dismiss');
			this.dataService.loading = false;
			return false;
		}
		return true;
	}

}