import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { ThemingService } from '../../../shared/services/theming.service';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss']
})
export class MobileHeaderComponent implements OnInit {

	pageTitle: string = '';
	themes: string[] = [];

  constructor(
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private theming: ThemingService
	) { }

  ngOnInit(): void {
		this.setPageTitle();
		this.themes = this.theming.themes;
	}

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

	changeTheme(theme: string) {
    this.theming.theme.next(theme);
  }

}