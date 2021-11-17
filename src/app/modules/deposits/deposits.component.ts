// App Variables
import { environment } from 'src/environments/environment';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deposits',
  templateUrl: './deposits.component.html',
  styleUrls: ['./deposits.component.scss']
})
export class DepositsComponent implements OnInit {

	interestRates = environment.interestRates;

  constructor() { }

  ngOnInit(): void {
  }

}
