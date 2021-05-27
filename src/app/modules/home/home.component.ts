import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

// Services
import { ApiService } from '../../shared/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	ccx: number = 0;
	wccx: number = 0;
	posts: any = [];
	stroke: number = 6;

  constructor(
		public breakpointObserver: BreakpointObserver,
		private apiService: ApiService
	) { }

  ngOnInit(): void {
		this.getPrices();
		this.getArticles();
		this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
		.subscribe((state: BreakpointState) => {
			if (state.matches) {
				// Matches small viewport or handset in portrait mode
				this.stroke = 6;
			} else {
				this.stroke = 3;
			}
		});
  }

	getPrices() {
		this.apiService.getMarketPrice().subscribe((data) => {
			let prices: any = data;
			this.ccx = prices['conceal'].usd;
			this.wccx = prices['wrapped-conceal'].usd;
		})
	}

	getArticles() {
		this.apiService.getMediumArticles().subscribe((data) => {
			let feed: any = data;
			this.posts.push(...feed.items);
		})
	}

}
