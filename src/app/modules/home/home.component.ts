import { Component, OnInit } from '@angular/core';

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

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
		this.getPrices();
  }

	getPrices() {
		this.apiService.getMarketPrice().subscribe((data) => {
			let prices: any = data;
			this.ccx = prices['conceal'].usd;
			this.wccx = prices['wrapped-conceal'].usd;
		})
	}

}
