import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-mobile-header',
  templateUrl: './mobile-header.component.html',
  styleUrls: ['./mobile-header.component.scss']
})
export class MobileHeaderComponent implements OnInit {

	title: any;

	constructor(
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private titleService: Title,
	) { }

	ngOnInit() {
    const appTitle = this.titleService.getTitle();
    this.router.events.pipe(
			filter(event => event instanceof NavigationEnd),
			map(() => {
				const child = this.activatedRoute.firstChild;
				if (child?.snapshot.data['title']) {
					return child.snapshot.data['title'];
				}
				return appTitle;
			})
		).subscribe((ttl: string) => {
			this.title = ttl;
		})
  }

}