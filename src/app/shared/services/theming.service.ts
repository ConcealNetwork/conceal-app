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
	exportDialogWidth: string = '450px';
	qrcodeDialogWidth: string = 'auto';
	articleDialogWidth: string = 'auto';
	dialogMaxWidth: string = '600px';
	dialogHeight: string = 'auto';
	articleDialogHeight: string = 'auto';
	walletGridColumns: number = 0;
	articleGridColumns: number = 0;
	depositGridColumns: number = 0;

  constructor (
		private ref: ApplicationRef,
		public breakpointObserver: BreakpointObserver
	) {

    // initially trigger dark mode if preference is set to dark mode on system
		const mode = localStorage.getItem('mode');
    const darkModeOn = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const lightModeOn = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;

		if (mode) {
			this.theme.next(mode);
		} else {
			if (darkModeOn) {
				this.theme.next("dark-theme");
			}
			if (lightModeOn) {
				this.theme.next("light-theme");
			}
			// watch for changes of the preference
			window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
				const turnOn = e.matches;
				this.theme.next(turnOn ? "dark-theme" : "light-theme");
				this.ref.tick(); // trigger refresh of UI
			});
		}

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
					this.exportDialogWidth = '95vw';
					this.qrcodeDialogWidth = '95vw';
					this.dialogMaxWidth = '95vw';
					this.dialogHeight = 'auto';
					this.articleGridColumns = 1;
					this.walletGridColumns = 1;
					this.depositGridColumns = 1;
					console.log('XSmall');
				} else if (state.breakpoints[Breakpoints.Small]) {
					this.isSmallScreen = true;
					this.stroke = 6;
					this.dialogWidth = '95vw';
					this.qrcodeDialogWidth = '95vw';
					this.dialogMaxWidth = '95vw';
					this.exportDialogWidth = '95vw';
					this.dialogHeight = 'auto';
					this.articleDialogWidth = '95vw';
					this.articleGridColumns = 1;
					this.walletGridColumns = 1;
					this.depositGridColumns = 1;
					console.log('Small');
				} else if (state.breakpoints[Breakpoints.Medium]) {
					this.isSmallScreen = false;
					this.stroke = 3;
					this.dialogWidth = '600px';
					this.qrcodeDialogWidth = '350px';
					this.dialogMaxWidth = '600px';
					this.exportDialogWidth = '450px';
					this.dialogHeight = 'auto';
					this.articleDialogWidth = '80vw';
					this.articleGridColumns = 1;
					this.walletGridColumns = 3;
					this.depositGridColumns = 1;
					console.log('Medium');
				} else if (state.breakpoints[Breakpoints.Large]) {
					this.isSmallScreen = false;
					this.stroke = 5;
					this.dialogWidth = '600px';
					this.qrcodeDialogWidth = '350px';
					this.exportDialogWidth = '450px';
					this.dialogMaxWidth = '600px';
					this.dialogHeight = 'auto';
					this.articleDialogWidth = '70vw';
					this.articleGridColumns = 1;
					this.walletGridColumns = 3;
					this.depositGridColumns = 2;
					console.log('Large');
				} else if (state.breakpoints[Breakpoints.XLarge]) {
					this.isSmallScreen = false;
					this.stroke = 5;
					this.dialogWidth = '600px';
					this.qrcodeDialogWidth = '350px';
					this.exportDialogWidth = '450px';
					this.dialogMaxWidth = '600px';
					this.articleDialogWidth = '60vw';
					this.dialogHeight = 'auto';
					this.articleGridColumns = 1;
					this.walletGridColumns = 3;
					this.depositGridColumns = 3;
					console.log('XLarge');
				}
			}
		});
	}

}