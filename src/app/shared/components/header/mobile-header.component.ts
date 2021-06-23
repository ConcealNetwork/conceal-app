import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { filter, map } from 'rxjs/operators';
import { Subscription } from "rxjs";

import { AuthService } from '../../../shared/services/auth.service';
import { ThemingService } from '../../../shared/services/theming.service';
import { SnackbarService } from '../../../shared/services/snackbar.service';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss']
})
export class MobileHeaderComponent implements OnInit {

	pageTitle: string = '';
	themes: string[] = [];
	activeTheme: string = '';
	watcherSubscription!: Subscription;
	isLoggedIn: boolean = false;

  constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private authService: AuthService,
		private theming: ThemingService,
		private snackbarService: SnackbarService
	) { }

	setPageTitle(): void {
		this.router.events.pipe(
			filter(event => event instanceof NavigationEnd),
			map(() => {
				let child = this.activatedRoute.firstChild;

				if (!child) {
					return this.activatedRoute.snapshot.data.title;
				}

				while (child.firstChild) {
					child = child.firstChild;
				}

				if (child.snapshot.data.title) {
					return child.snapshot.data.title;
				}
			})
		).subscribe((title: string) => this.pageTitle = title);
	}

	logout() {
		this.authService.logout();
		this.router.navigate(['/']);
		this.snackbarService.openSnackBar('👋 See you soon. (Logged out)', 'Dismiss');
	}

	changeTheme(theme: string) {
    this.theming.theme.next(theme);
		this.activeTheme = this.theming.theme.value;
		this.snackbarService.openSnackBar(`You just switched to ${this.activeTheme === 'light-theme' ? '☀️ Light Mode' : '🌒 Dark Mode'}`, 'Dismiss');
  }

	ngOnInit(): void {
		this.setPageTitle();
		this.themes = this.theming.themes;
		this.activeTheme = this.theming.theme.value;
		this.watcherSubscription = this.authService.isLoginSubject.subscribe(
			(isLoggedIn: boolean) => {
				this.isLoggedIn = isLoggedIn;
			}
		);
	}

}