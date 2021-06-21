import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Subscription } from "rxjs";

// Services
import { AuthService } from '../../../shared/services/auth.service';
import { ThemingService } from '../../../shared/services/theming.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	themes: string[] = [];
	activeTheme: string = '';
	watcherSubscription!: Subscription;
	isLoggedIn: boolean = false;

  constructor(
		private router: Router,
		private authService: AuthService,
		private theming: ThemingService
	) { }

	changeTheme(theme: string) {
    this.theming.theme.next(theme);
		this.activeTheme = this.theming.theme.value;
  }

	logout() {
		this.authService.logout();
		this.router.navigate(['/']);
	}

	ngOnInit(): void {
		this.themes = this.theming.themes;
		this.activeTheme = this.theming.theme.value;
		this.watcherSubscription = this.authService.isLoginSubject.subscribe(
			(isLoggedIn: boolean) => {
				this.isLoggedIn = isLoggedIn;
			}
		);
	}

}