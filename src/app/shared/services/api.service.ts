import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { CordovaService } from 'src/app/shared/services/cordova.service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

	coinStats = environment.coinStats;
	gecko = environment.gecko;
	rss2json = environment.rss2json;
	nitter = environment.nitter;

	constructor(
		private httpclient: HttpClient,
		private http: HTTP,
		private cordovaService: CordovaService,
	) { }

	getCurrencies() {
		if (!this.cordovaService.onCordova) {
			return this.httpclient.get(`${this.coinStats}/public/v1/fiats`);
		} else {
			return from(this.http.get(`${this.coinStats}/public/v1/fiats`, {}, {})).pipe(map((data: any) => JSON.parse(data?.data)));
		}
	}

	getMarketPrice() {
		if (!this.cordovaService.onCordova) {
			return this.httpclient.get(`${this.gecko}/api/v3/simple/price?ids=conceal,wrapped-conceal&vs_currencies=usd`);
		} else {
			return from(this.http.get(`${this.gecko}/api/v3/simple/price?ids=conceal,wrapped-conceal&vs_currencies=usd`, {}, {})).pipe(map((data: any) => JSON.parse(data?.data)));
		}
  };

	getMediumArticles() {
		if (!this.cordovaService.onCordova) {
			return this.httpclient.get(`${this.rss2json}/v1/api.json?rss_url=https://medium.com/feed/@concealnetwork`);
		} else {
			return from(this.http.get(`${this.rss2json}/v1/api.json?rss_url=https://medium.com/feed/@concealnetwork`, {}, {})).pipe(map((data: any) => JSON.parse(data?.data)));
		}
	}

	getTwitterArticles() {
		if (!this.cordovaService.onCordova) {
			return this.httpclient.get(`${this.rss2json}/v1/api.json?rss_url=${this.nitter}/ConcealNetwork/rss`);
		} else {
			return from(this.http.get(`${this.rss2json}/v1/api.json?rss_url=${this.nitter}/ConcealNetwork/rss`, {}, {})).pipe(map((data: any) => JSON.parse(data?.data)));
		}
	}

	getRedditPosts() {
		if (!this.cordovaService.onCordova) {
			return this.httpclient.get(`${this.rss2json}/v1/api.json?rss_url=https://www.reddit.com/r/ConcealNetwork/.rss`);
		} else {
			return from(this.http.get(`${this.rss2json}/v1/api.json?rss_url=https://www.reddit.com/r/ConcealNetwork/.rss`, {}, {})).pipe(map((data: any) => JSON.parse(data?.data)));
		}
	}

	getYouTubePosts() {
		if (!this.cordovaService.onCordova) {
			return this.httpclient.get(`${this.rss2json}/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UC_YtRUcy0FR0yIc3H6DDxuw`);
		} else {
			return from(this.http.get(`${this.rss2json}/v1/api.json?rss_url=https://www.youtube.com/feeds/videos.xml?channel_id=UC_YtRUcy0FR0yIc3H6DDxuw`, {}, {})).pipe(map((data: any) => JSON.parse(data?.data)));
		}
	}

	getPrice(currency:any) {
		if (!this.cordovaService.onCordova) {
			return this.httpclient.get(`${this.gecko}/api/v3/simple/price?ids=conceal&vs_currencies=btc,${currency}&include_last_updated_at=false`);
		} else {
			return from(this.http.get(`${this.gecko}/api/v3/simple/price?ids=conceal&vs_currencies=btc,${currency}&include_last_updated_at=false`, {}, {})).pipe(map((data: any) => JSON.parse(data?.data)));
		}
  };

}
