// App Variables
import { environment } from 'src/environments/environment';

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Meta } from "@angular/platform-browser";
import { Router } from '@angular/router';
import { Subscription } from "rxjs";

import { AuthService } from 'src/app/shared/services/auth.service';
import { ThemingService } from 'src/app/shared/services/theming.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

	@Output() sideNavClosed = new EventEmitter();

	version: any = environment.version;
	year: number = new Date().getFullYear();
	themes: string[] = [];
	activeTheme: string = '';
	watcherSubscription!: Subscription;
	isLoggedIn: boolean = false;

  constructor(
		private router: Router,
		private meta: Meta,
		private authService: AuthService,
		private snackbarService: SnackbarService,
		private theming: ThemingService
	) { }

  ngOnInit(): void {
		this.themes = this.theming.themes;
		this.activeTheme = this.theming.theme.value;
		this.watcherSubscription = this.authService.isLoginSubject.subscribe(
			(isLoggedIn: boolean) => {
				this.isLoggedIn = isLoggedIn;
			}
		);
  }

	close() {
		this.sideNavClosed.emit(); // Emit event to parent component so it can tell sidenav to close
	}

	changeTheme(theme: string) {
		this.close();
    this.theming.theme.next(theme);
		this.activeTheme = this.theming.theme.value;
		this.meta.updateTag({ content: `${this.activeTheme === 'light-theme' ? 'light' : 'dark'}` }, 'name=color-scheme');
		this.snackbarService.openSnackBar(`${this.activeTheme === 'light-theme' ? ' ☀️ Light Mode' : '🌙 Dark Mode'} Activated`, 'Dismiss');
  }

	logout() {
		this.close();
		this.authService.logout();
		this.router.navigate(['/auth']);
		this.snackbarService.openSnackBar('👋 See you soon. (Logged out)', 'Dismiss');
	}

	login() {
		this.router.navigate(['/auth']);
	}

}
