import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

	constructor(private http: HttpClient) { }

	getMarketPrice() {
		return this.http.get(`https://api.coingecko.com/api/v3/simple/price?ids=conceal,wrapped-conceal&vs_currencies=usd`);
  };

	getMediumArticles() {
		return this.http.get(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@concealnetwork`);
	}
}