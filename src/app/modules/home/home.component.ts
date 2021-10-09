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
	gridColumns: number = 0;

  constructor(
		public breakpointObserver: BreakpointObserver,
		private apiService: ApiService
	) { }

  ngOnInit(): void {
		this.getPrices();
		this.getArticles();
		this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
		.subscribe((state: BreakpointState) => {
			if (state.matches) {
				this.stroke = 6;
				this.gridColumns = 1;
				console.log('Breakpoint: Small');
			}
		});
		this.breakpointObserver.observe([Breakpoints.Medium])
		.subscribe((state: BreakpointState) => {
			if (state.matches) {
				this.stroke = 3;
				this.gridColumns = 2;
				console.log('Breakpoint: Medium');
			}
		});
		this.breakpointObserver.observe([Breakpoints.Large])
		.subscribe((state: BreakpointState) => {
			if (state.matches) {
				this.stroke = 5;
				this.gridColumns = 3;
				console.log('Breakpoint: Large');
			}
		});
		this.breakpointObserver.observe([Breakpoints.XLarge])
		.subscribe((state: BreakpointState) => {
			if (state.matches) {
				this.stroke = 5;
				this.gridColumns = 4;
				console.log('Breakpoint: XLarge');
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
