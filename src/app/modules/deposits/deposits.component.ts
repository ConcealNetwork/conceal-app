// App Variables
import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { ThemingService } from 'src/app/shared/services/theming.service';

@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.scss']
})
export class DepositsComponent implements OnInit {

	interestRates = environment.interestRates;

	formatLabel(value: number) {
    return value + 'M';
  }

  constructor(
		private themingService: ThemingService
	) { }

	getThemingService() {
		return this.themingService;
	}

  ngOnInit(): void {
  }

}
