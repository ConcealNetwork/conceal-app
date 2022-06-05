import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

// Services
import { DataService } from './services/data.service';

interface Networks {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-bridge',
  templateUrl: './bridge.component.html',
  styleUrls: ['./bridge.component.scss'],
	animations: [
		trigger('transition', [
			transition(':enter', [
				query('#cards', [
					style({ opacity: 0}),
					stagger(100, [
						animate('0.4s', style({ opacity: 1 }))
					])
				], {optional: true})
			])
		])
	]
})
export class BridgeComponent implements OnInit {

	form: FormGroup;

	fromNetwork: Networks[] = [
    {value: 'ccx', viewValue: 'Conceal (CCX)'},
    {value: 'eth', viewValue: 'Ethereum (wCCX)'},
    {value: 'bsc', viewValue: 'Binance (wCCX)'},
    {value: 'plg', viewValue: 'Polygon (wCCX)'},
    {value: 'avax', viewValue: 'Avalanche (wCCX)'},
  ];

	toNetwork: Networks[] = [
    {value: 'ccx', viewValue: 'Conceal (CCX)'},
    {value: 'eth', viewValue: 'Ethereum (wCCX)'},
		{value: 'bsc', viewValue: 'Binance (wCCX)'},
		{value: 'plg', viewValue: 'Polygon (wCCX)'},
		{value: 'avax', viewValue: 'Avalanche (wCCX)'},
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
			} else if (value === 'avax') {
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
			} else if (value === 'avax') {
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
			this.router.navigate(['eth'], { relativeTo: this.route, skipLocationChange: true });
		}
		if (from === 'ccx' && to === 'bsc') {
			this.dataService.apiPath = 'bsc';
			this.router.navigate(['bsc'], { relativeTo: this.route, skipLocationChange: true });
		}
		if (from === 'ccx' && to === 'plg') {
			this.dataService.apiPath = 'plg';
			this.router.navigate(['plg'], { relativeTo: this.route, skipLocationChange: true });
		}
		if (from === 'ccx' && to === 'avax') {
			this.dataService.apiPath = 'avax';
			this.router.navigate(['avax'], { relativeTo: this.route, skipLocationChange: true });
		}
		if (from === 'eth' && to === 'ccx') {
			this.dataService.apiPath = 'eth';
			this.router.navigate(['ccx'], { relativeTo: this.route, skipLocationChange: true });
		}
		if (from === 'bsc' && to === 'ccx') {
			this.dataService.apiPath = 'bsc';
			this.router.navigate(['ccx'], { relativeTo: this.route, skipLocationChange: true });
		}
		if (from === 'plg' && to === 'ccx') {
			this.dataService.apiPath = 'plg';
			this.router.navigate(['ccx'], { relativeTo: this.route, skipLocationChange: true });
		}
		if (from === 'avax' && to === 'ccx') {
			this.dataService.apiPath = 'avax';
			this.router.navigate(['ccx'], { relativeTo: this.route, skipLocationChange: true });
		}
	}

	ngOnInit() {
		// Subscribe to routes
		this.route.params.subscribe( params => { const key = <string>params['key'] } );
	}

}
