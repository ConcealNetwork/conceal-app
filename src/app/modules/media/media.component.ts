// Angular Core
import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// Services
import { ApiService } from 'src/app/shared/services/api.service';
import { ThemingService } from 'src/app/shared/services/theming.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-media',
    templateUrl: './media.component.html',
    styleUrls: ['./media.component.scss'],
    animations: [
        trigger('listAnimation1', [
            transition('* => *', [
                query(':enter', [
                    style({ opacity: 0 }),
                    stagger(100, [
                        animate('0.4s', style({ opacity: 1 }))
                    ])
                ], { optional: true })
            ])
        ]),
        trigger('listAnimation2', [
            transition('* => *', [
                query(':enter', [
                    style({ opacity: 0 }),
                    stagger(100, [
                        animate('0.4s', style({ opacity: 1 }))
                    ])
                ], { optional: true })
            ])
        ])
    ],
    standalone: false
})
export class MediaComponent implements OnInit {

	// Variables
	isLoading: boolean = true;
	posts: any = [];
	mediumPosts: any[] = [];
	mediumLimit: number = 5;
	expanded: boolean = true;
	discordUpdates: Array<{ id: string; content: string; createdAt: string }> = [];
	discordLoaded: boolean = false;
	currency: string = environment.currency;
	ccxFiatPrice: number | null = null;
	/** From `environment.exchanges` (name + link). */
	readonly exchanges: Array<{ name: string; url: string }> = environment.exchanges ?? [];

  constructor(
		private apiService: ApiService,
		private themingService: ThemingService,
		private snackbarService: SnackbarService,
		private dialogService: DialogService,
		public breakpointObserver: BreakpointObserver,
	) { }

	getThemingService() {
		return this.themingService;
	}

  ngOnInit(): void {
		this.currency = (localStorage.getItem('currency') ?? environment.currency).toLowerCase();
		this.loadMarketPrice();
		this.getArticles();
		// watch for changes of the screen size
		this.breakpointObserver.observe([
			Breakpoints.XSmall,
		]).subscribe((state: BreakpointState) => {
			if (state.matches) {
				if (state.breakpoints[Breakpoints.XSmall]) {
					this.mediumLimit = Math.min(10, this.mediumPosts.length || 10);
					this.expanded = false;
				}
			}
		});
	}

	openArticle(item: string) {
		this.dialogService.openArticleDialog(item);
	}

	toDate(time: number) {
		return new Date(time);
	}

	loadDiscordUpdates() {
		if (this.discordLoaded) {
			return;
		}
		this.discordLoaded = true;
		if (!environment.discordUpdatesUrl) {
			return;
		}
		fetch(environment.discordUpdatesUrl, { method: 'GET' })
			.then(r => r.json())
			.then((items: Array<{ id: string; content: string; createdAt: string }>) => {
				if (Array.isArray(items)) {
					this.discordUpdates = items.sort((a, b) =>
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
					);
				}
			})
			.catch(() => {
				// best-effort; no UI error
			});
	}

	setLimit(number:number) { this.mediumLimit = number; }
	showAllMedium() { this.mediumLimit = this.mediumPosts.length; }

	loadMarketPrice(): void {
		this.apiService.getPrice(this.currency).pipe(catchError(() => of(null))).subscribe((data: any) => {
			const v = data?.conceal?.[this.currency];
			this.ccxFiatPrice = typeof v === 'number' && !Number.isNaN(v) ? v : null;
		});
	}

	getArticles() {
		this.apiService.getMediumArticles().pipe(catchError(() => of(null))).subscribe((medium: any) => {
			try {
				this.mediumPosts = Array.isArray(medium?.items) ? medium.items.map((it: any) => ({
					author: it.author, title: it.title, description: it.description, pubDate: it.pubDate, link: it.link, thumbnail: it.thumbnail, source: 'Medium'
				})) : [];
				this.posts = [...this.mediumPosts].sort((a: any, b: any) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());
			} finally {
				this.isLoading = false;
			}
		}, () => {
			this.isLoading = false;
			this.snackbarService.openSnackBar('Could not retrieve social data', 'Dismiss');
		});
		// let youtube = this.apiService.getYouTubePosts().subscribe((data:any) => {
		// 	if (data) {
		// 		for (let i = 0; i < data.items.length; i++) {
		// 			// add an new object in array of objects
		// 			this.posts.push({
		// 				author: data.items[i].author,
		// 				title: data.items[i].title,
		// 				description: data.items[i].description,
		// 				pubDate: data.items[i].pubDate,
		// 				link: data.items[i].link,
		// 				thumbnail: data.items[i].thumbnail,
		// 				source: 'YouTube'
		// 			});
		// 		}
		// 		this.isLoading = false;
		// 	} else {
		// 		this.isLoading = false;
		// 		this.snackbarService.openSnackBar('Could not retrieve youtube articles', 'Dismiss');
		// 	}
		// })
		// let reddit = this.apiService.getRedditPosts().subscribe((data:any) => {
		// 	if (data) {
		// 		for (let i = 0; i < data.items.length; i++) {
		// 			// add an new object in array of objects
		// 			this.posts.push({
		// 				author: data.items[i].author,
		// 				title: data.items[i].title,
		// 				description: data.items[i].description,
		// 				pubDate: data.items[i].pubDate,
		// 				link: data.items[i].link,
		// 				source: 'Reddit'
		// 			});
		// 		}
		// 		this.isLoading = false;
		// 	} else {
		// 		this.isLoading = false;
		// 		this.snackbarService.openSnackBar('Could not retrieve reddit articles', 'Dismiss');
		// 	}
		// })
		// call wallets and deposits
	}

}
