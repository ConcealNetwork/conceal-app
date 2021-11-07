import { ApplicationRef, Injectable } from "@angular/core";
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { BehaviorSubject } from "rxjs";

@Injectable()

export class ThemingService {

  themes = ["dark-theme", "light-theme"];
  theme = new BehaviorSubject("light-theme");
	isSmallScreen: boolean = false;
	stroke: number = 6;
	dialogWidth: string = '600px';
	dialogMaxWidth: string = '600px';
	dialogHeight: string = 'auto';
	walletGridColumns: number = 0;
	articleGridColumns: number = 0;

  constructor (
		private ref: ApplicationRef,
		public breakpointObserver: BreakpointObserver
	) {
    // initially trigger dark mode if preference is set to dark mode on system
    const darkModeOn = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    if(darkModeOn){
      this.theme.next("dark-theme");
    }

    // watch for changes of the preference
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      const turnOn = e.matches;
      this.theme.next(turnOn ? "dark-theme" : "light-theme");
      this.ref.tick(); // trigger refresh of UI
    });

		// watch for changes of the screen size
		this.breakpointObserver.observe([
			Breakpoints.XSmall,
			Breakpoints.Small,
			Breakpoints.Medium,
			Breakpoints.Large,
			Breakpoints.XLarge
		]).subscribe((state: BreakpointState) => {
			if (state.matches) {
				if (state.breakpoints[Breakpoints.XSmall]) {
					this.isSmallScreen = true;
					this.stroke = 6;
					this.dialogWidth = '95vw';
					this.dialogMaxWidth = '95vw';
					this.dialogHeight = 'auto';
					this.articleGridColumns = 1;
					this.walletGridColumns = 1;
					console.log('XSmall');
				} else if (state.breakpoints[Breakpoints.Small]) {
					this.isSmallScreen = true;
					this.stroke = 6;
					this.dialogWidth = '95vw';
					this.dialogMaxWidth = '95vw';
					this.dialogHeight = 'auto';
					this.articleGridColumns = 1;
					this.walletGridColumns = 2;
					console.log('Small');
				} else if (state.breakpoints[Breakpoints.Medium]) {
					this.isSmallScreen = false;
					this.stroke = 3;
					this.dialogWidth = '600px';
					this.dialogMaxWidth = '600px';
					this.dialogHeight = 'auto';
					this.articleGridColumns = 2;
					this.walletGridColumns = 3;
					console.log('Medium');
				} else if (state.breakpoints[Breakpoints.Large]) {
					this.isSmallScreen = false;
					this.stroke = 5;
					this.dialogWidth = '600px';
					this.dialogMaxWidth = '600px';
					this.dialogHeight = 'auto';
					this.articleGridColumns = 3;
					this.walletGridColumns = 3;
					console.log('Large');
				} else if (state.breakpoints[Breakpoints.XLarge]) {
					this.isSmallScreen = false;
					this.stroke = 5;
					this.dialogWidth = '600px';
					this.dialogMaxWidth = '600px';
					this.dialogHeight = 'auto';
					this.articleGridColumns = 4;
					this.walletGridColumns = 3;
					console.log('XLarge');
				}
			}
		});
	}

}