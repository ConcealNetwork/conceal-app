import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { getSupportedInputTypes, Platform, supportsPassiveEventListeners, supportsScrollBehavior } from '@angular/cdk/platform';
import { Subscription } from 'rxjs';
import { ThemingService } from './shared/services/theming.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {

  themingSubscription!: Subscription;
	@HostBinding('class') className = '';

	// check platform properties
  supportedInputTypes = Array.from(getSupportedInputTypes()).join(', ');
  supportsPassiveEventListeners = supportsPassiveEventListeners();
  supportsScrollBehavior = supportsScrollBehavior();
	isSmallScreen: boolean = false;

  constructor(
		private themingService: ThemingService,
		private overlayContainer: OverlayContainer,
		public breakpointObserver: BreakpointObserver,
		public platform: Platform
	) {

	}

	ngOnInit() {
		this.themingSubscription = this.themingService.theme.subscribe((theme: string) => {
      this.className = theme;
      this.applyThemeOnOverlays();
    });

		this.breakpointObserver.observe([Breakpoints.Small, Breakpoints.XSmall])
		.subscribe((state: BreakpointState) => {
			if (state.matches) {
				// Matches small viewport or handset in portrait mode
				this.isSmallScreen = true;
			} else {
				this.isSmallScreen = false;
			}
		});
	}

  /**
  * Apply the current theme on components with overlay (e.g. Dropdowns, Dialogs)
  */
	private applyThemeOnOverlays() {
		// remove old theme class and add new theme class
		// we're removing any css class that contains '-theme' string but your theme classes can follow any pattern
		const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
		const themeClassesToRemove = Array.from(this.themingService.themes);
		if (themeClassesToRemove.length) {
			overlayContainerClasses.remove(...themeClassesToRemove);
		}
		overlayContainerClasses.add(this.className);
	}

	ngOnDestroy() {
		this.themingSubscription.unsubscribe();
	}

}