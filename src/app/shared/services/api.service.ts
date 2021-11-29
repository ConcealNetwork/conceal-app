import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

	constructor(private http: HttpClient) { }

	getCurrencies() {
		return this.http.get(`https://api.coinstats.app/public/v1/fiats`);
	}

	getMarketPrice() {
		return this.http.get(`https://api.coingecko.com/api/v3/simple/price?ids=conceal,wrapped-conceal&vs_currencies=usd`);
  };

	getMediumArticles() {
		return this.http.get(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@concealnetwork`);
	}

	getTwitterArticles() {
		return this.http.get(`https://api.rss2json.com/v1/api.json?rss_url=https://nitter.net/ConcealNetwork/rss`);
	}

	getPrice(currency:any) {
		return this.http.get(`https://api.coingecko.com/api/v3/simple/price?ids=conceal&vs_currencies=btc,${currency}&include_last_updated_at=false`);
  };

}
