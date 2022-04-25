export const environment = {
  production: true,
	worker: false,
  environment: 'PROD',
	version: '1.3.1',
	api: 'https://bridge.conceal.network/backend',
  walletAPI: 'https://api.wallet.conceal.network/api',
  coinStats: 'https://api.coinstats.app',
  gecko: 'https://api.coingecko.com',
  rss2json: 'https://api.rss2json.com',
  nitter: 'https://de.nttr.stream',
	interval: 60000,
	defaultFee: 0.001000,
	depositBlocksPerMonth: 21900,
	walletLimit: 2,
	idValue: 20.001,
	currency: 'usd',
	interestRates: [
		[0.24, 0.33, 0.41],
		[0.50, 0.67, 0.83],
		[0.78, 1.03, 1.28],
		[1.07, 1.40, 1.73],
		[1.38, 1.79, 2.21],
		[1.70, 2.20, 4.70],
		[2.04, 2.63, 3.21],
		[2.40, 3.07, 3.73],
		[2.78, 3.53, 4.28],
		[3.17, 4.00, 4.83],
		[3.58, 4.49, 5.41],
		[4.00, 5.00, 6.00],
	],
	recaptcha: {
		siteKey: '4b23f7fc-ed7c-4284-ae98-b077d8745254',
	},
};