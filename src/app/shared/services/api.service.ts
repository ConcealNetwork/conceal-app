import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { from, of } from 'rxjs';
import { map } from 'rxjs/operators';

/** Matches settings template + CoinGecko `vs_currencies` (lowercase symbol). */
export type CurrencyOption = { name: string; symbol: string; imageUrl: string };

const FIAT_VS: CurrencyOption[] = [
	{ name: 'US Dollar', symbol: 'USD', imageUrl: 'https://flagcdn.com/w20/us.png' },
	{ name: 'Euro', symbol: 'EUR', imageUrl: 'https://flagcdn.com/w20/eu.png' },
	{ name: 'British Pound', symbol: 'GBP', imageUrl: 'https://flagcdn.com/w20/gb.png' },
	{ name: 'Japanese Yen', symbol: 'JPY', imageUrl: 'https://flagcdn.com/w20/jp.png' },
	{ name: 'Australian Dollar', symbol: 'AUD', imageUrl: 'https://flagcdn.com/w20/au.png' },
	{ name: 'Canadian Dollar', symbol: 'CAD', imageUrl: 'https://flagcdn.com/w20/ca.png' },
	{ name: 'Swiss Franc', symbol: 'CHF', imageUrl: 'https://flagcdn.com/w20/ch.png' },
	{ name: 'Chinese Yuan', symbol: 'CNY', imageUrl: 'https://flagcdn.com/w20/cn.png' },
];

function mapCoinGeckoMarketToCurrency(c: any): CurrencyOption {
	return {
		name: c.name,
		symbol: String(c.symbol || '').toUpperCase(),
		imageUrl: c.image,
	};
}

/** Same shape as rss2json `items` entries for media list. */
export type RssArticleItem = {
	author: string;
	title: string;
	description: string;
	pubDate: string;
	link: string;
	thumbnail: string;
	source: string;
};

/** rss2json.com `items` → media list rows (Substack uses this path; direct RSS from the browser hits CORS). */
function mapRss2JsonResponseToArticleItems(data: any, sourceLabel: string): RssArticleItem[] {
	if (!data || data.status !== 'ok' || !Array.isArray(data.items)) {
		return [];
	}
	return data.items.map((it: any) => ({
		author: it.author ?? '',
		title: it.title ?? '',
		description: it.description ?? '',
		pubDate: it.pubDate ?? '',
		link: it.link ?? '',
		thumbnail: it.thumbnail ?? '',
		source: sourceLabel,
	}));
}

function mergeCurrencies(rows: any[]): CurrencyOption[] {
	const fromApi = (Array.isArray(rows) ? rows : []).map(mapCoinGeckoMarketToCurrency);
	const seen = new Set<string>();
	const out: CurrencyOption[] = [];
	for (const item of [...FIAT_VS, ...fromApi]) {
		const key = item.symbol.toLowerCase();
		if (seen.has(key)) {
			continue;
		}
		seen.add(key);
		out.push(item);
	}
	return out;
}
import { environment } from 'src/environments/environment';
import { CordovaService } from 'src/app/shared/services/cordova.service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

	gecko = environment.gecko;
	rss2json = environment.rss2json;

	constructor(
		private httpclient: HttpClient,
		private http: HTTP,
		private cordovaService: CordovaService,
	) { }

	getCurrencies() {
		const url = `${this.gecko}/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1`;
		if (!this.cordovaService.onCordova) {
			return this.httpclient.get<any[]>(url).pipe(map(mergeCurrencies));
		}
		return from(this.http.get(url, {}, {})).pipe(
			map((data: any) => JSON.parse(data?.data)),
			map(mergeCurrencies),
		);
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

	/**
	 * Substack feed via rss2json (same idea as Medium). A direct `HttpClient` GET to
	 * `*.substack.com/feed` from the app origin is blocked by CORS, so the RSS is fetched server-side.
	 * Set `environment.substackFeedUrl` to e.g. `https://yoursubstack.substack.com/feed`.
	 */
	getSubstackArticles() {
		const feedUrl = environment.substackFeedUrl?.trim();
		if (!feedUrl) {
			return of({ items: [] as RssArticleItem[] });
		}
		const rss2jsonUrl = `${this.rss2json}/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`;
		if (!this.cordovaService.onCordova) {
			return this.httpclient.get<any>(rss2jsonUrl).pipe(
				map((data) => ({ items: mapRss2JsonResponseToArticleItems(data, 'Substack') })),
			);
		}
		return from(this.http.get(rss2jsonUrl, {}, {})).pipe(
			map((res: any) => JSON.parse(res?.data)),
			map((data) => ({ items: mapRss2JsonResponseToArticleItems(data, 'Substack') })),
		);
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
