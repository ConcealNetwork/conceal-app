import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

import { CordovaService } from 'src/app/shared/services/cordova.service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

	constructor(
		private httpclient: HttpClient,
		private http: HTTP,
		private cordovaService: CordovaService,
	) { }

	getCurrencies() {
		if (!this.cordovaService.onCordova) {
			return this.httpclient.get(`https://api.coinstats.app/public/v1/fiats`);
		} else {
			return from(this.http.get(`https://api.coinstats.app/public/v1/fiats`, {}, {})).pipe(map((data: any) => JSON.parse(data?.data)));
		}
	}

	getMarketPrice() {
		if (!this.cordovaService.onCordova) {
			return this.httpclient.get(`https://api.coingecko.com/api/v3/simple/price?ids=conceal,wrapped-conceal&vs_currencies=usd`);
		} else {
			return from(this.http.get(`https://api.coingecko.com/api/v3/simple/price?ids=conceal,wrapped-conceal&vs_currencies=usd`, {}, {})).pipe(map((data: any) => JSON.parse(data?.data)));
		}
  };

	getMediumArticles() {
		if (!this.cordovaService.onCordova) {
			return this.httpclient.get(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@concealnetwork`);
		} else {
			return from(this.http.get(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@concealnetwork`, {}, {})).pipe(map((data: any) => JSON.parse(data?.data)));
		}
	}

	getTwitterArticles() {
		if (!this.cordovaService.onCordova) {
			return this.httpclient.get(`https://api.rss2json.com/v1/api.json?rss_url=https://nitter.fly.dev/ConcealNetwork/rss`);
		} else {
			return from(this.http.get(`https://api.rss2json.com/v1/api.json?rss_url=https://nitter.fly.dev/ConcealNetwork/rss`, {}, {})).pipe(map((data: any) => JSON.parse(data?.data)));
		}
	}

	getRedditPosts() {
		if (!this.cordovaService.onCordova) {
			return this.httpclient.get(`https://api.rss2json.com/v1/api.json?rss_url=https://www.reddit.com/r/ConcealNetwork/.rss`);
		} else {
			return from(this.http.get(`https://api.rss2json.com/v1/api.json?rss_url=https://www.reddit.com/r/ConcealNetwork/.rss`, {}, {})).pipe(map((data: any) => JSON.parse(data?.data)));
		}
	}

	getYouTubePosts() {
		if (!this.cordovaService.onCordova) {
			return this.httpclient.get(`https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UC_YtRUcy0FR0yIc3H6DDxuw`);
		} else {
			return from(this.http.get(`https://api.rss2json.com/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UC_YtRUcy0FR0yIc3H6DDxuw`, {}, {})).pipe(map((data: any) => JSON.parse(data?.data)));
		}
	}

	getPrice(currency:any) {
		if (!this.cordovaService.onCordova) {
			return this.httpclient.get(`https://api.coingecko.com/api/v3/simple/price?ids=conceal&vs_currencies=btc,${currency}&include_last_updated_at=false`);
		} else {
			return from(this.http.get(`https://api.coingecko.com/api/v3/simple/price?ids=conceal&vs_currencies=btc,${currency}&include_last_updated_at=false`, {}, {})).pipe(map((data: any) => JSON.parse(data?.data)));
		}
  };

}
