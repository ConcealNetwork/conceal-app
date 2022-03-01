import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';

// Services
import { DataService } from './services/data.service';

interface Networks {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-bridge',
  templateUrl: './bridge.component.html',
  styleUrls: ['./bridge.component.scss']
})
export class BridgeComponent implements OnInit {

	form: FormGroup;

	fromNetwork: Networks[] = [
    {value: 'ccx', viewValue: 'Conceal (CCX)'},
    {value: 'eth', viewValue: 'Ethereum (wCCX)'},
    {value: 'bsc', viewValue: 'Binance Smart Chain (wCCX)'},
    {value: 'plg', viewValue: 'Polygon (wCCX)'},
  ];

	toNetwork: Networks[] = [
    {value: 'ccx', viewValue: 'Conceal (CCX)'},
    {value: 'eth', viewValue: 'Ethereum (wCCX)'},
		{value: 'bsc', viewValue: 'Binance Smart Chain (wCCX)'},
		{value: 'plg', viewValue: 'Polygon (wCCX)'},
  ];

	fromControl = new FormControl(this.fromNetwork[0].value);
	toControl = new FormControl(this.toNetwork[1].value);

	constructor (
		public router: Router,
    private route: ActivatedRoute,
		private dataService: DataService
	) {
		this.form = new FormGroup({
      from: this.fromControl,
      to: this.toControl
    });
	}

  // swap direction
  changeNetwork(value: string, direction: string) {
    if (direction === 'to') {
			if (value === 'eth') {
				this.form.controls.from.patchValue('ccx');
			} else if (value === 'bsc') {
				this.form.controls.from.patchValue('ccx');
			} else if (value === 'plg') {
				this.form.controls.from.patchValue('ccx');
			} else {
				return false;
			}
		}
		if (direction === 'from') {
			if (value === 'bsc') {
				this.form.controls.to.patchValue('ccx');
			} else if (value === 'eth') {
				this.form.controls.to.patchValue('ccx');
			} else if (value === 'plg') {
				this.form.controls.to.patchValue('ccx');
			} else {
				return false;
			}
		}
		return;
  }

	submit(from:string, to:string) {
		if (from === 'ccx' && to === 'eth') {
			this.dataService.apiPath = 'eth';
			this.router.navigate(['/eth'], { skipLocationChange: true });
		}
		if (from === 'ccx' && to === 'bsc') {
			this.dataService.apiPath = 'bsc';
			this.router.navigate(['/bsc'], { skipLocationChange: true });
		}
		if (from === 'ccx' && to === 'plg') {
			this.dataService.apiPath = 'plg';
			this.router.navigate(['/plg'], { skipLocationChange: true });
		}
		if (from === 'eth' && to === 'ccx') {
			this.dataService.apiPath = 'eth';
			this.router.navigate(['/ccx'], { skipLocationChange: true });
		}
		if (from === 'bsc' && to === 'ccx') {
			this.dataService.apiPath = 'bsc';
			this.router.navigate(['/ccx'], { skipLocationChange: true });
		}
		if (from === 'plg' && to === 'ccx') {
			this.dataService.apiPath = 'plg';
			this.router.navigate(['/ccx'], { skipLocationChange: true });
		}
	}

	ngOnInit() {
		// Subscribe to routes
		this.route.params.subscribe( params => { const key = <string>params['key'] } );
	}

}
