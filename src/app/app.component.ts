import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { getSupportedInputTypes, Platform, supportsPassiveEventListeners, supportsScrollBehavior } from '@angular/cdk/platform';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

	// check platform properties
  supportedInputTypes = Array.from(getSupportedInputTypes()).join(', ');
  supportsPassiveEventListeners = supportsPassiveEventListeners();
  supportsScrollBehavior = supportsScrollBehavior();
	isSmallScreen: boolean = false;

  constructor(
		public breakpointObserver: BreakpointObserver,
		public platform: Platform
	) {	}

	ngOnInit() {
		this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
		.subscribe((state: BreakpointState) => {
			if (state.matches) {
				// Matches small viewport or handset in portrait mode
				this.isSmallScreen = true;
			} else {
				this.isSmallScreen = false;
			}
		});
	}

}