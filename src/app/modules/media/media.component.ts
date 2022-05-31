// Angular Core
import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

import * as moment from 'moment';

// Services
import { ApiService } from 'src/app/shared/services/api.service';
import { ThemingService } from 'src/app/shared/services/theming.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
	animations: [
		trigger('listAnimation1', [
			transition('* => *', [ // each time the binding value changes
				query(':enter', [
					style({ opacity: 0 }),
					stagger(100, [
						animate('0.4s', style({ opacity: 1 }))
					])
				], {optional: true})
			])
		]),
		trigger('listAnimation2', [
			transition('* => *', [ // each time the binding value changes
				query(':enter', [
					style({ opacity: 0 }),
					stagger(100, [
						animate('0.4s', style({ opacity: 1 }))
					])
				], {optional: true})
			])
		])
	]
})
export class MediaComponent implements OnInit {

	// Variables
	isLoading: boolean = true;
	limit: number = 2;
	posts: any = [];

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
		this.getArticles();
		// watch for changes of the screen size
		this.breakpointObserver.observe([
			Breakpoints.XSmall,
		]).subscribe((state: BreakpointState) => {
			if (state.matches) {
				if (state.breakpoints[Breakpoints.XSmall]) {
					this.limit = 5;
				}
			}
		});
	}

	openArticle(item: string) {
		this.dialogService.openArticleDialog(item);
	}

	toDate(time: number) {
		return moment(time);
	}

	setLimit(number:number) {
		this.limit = number;
	}

	getArticles() {
		let medium = this.apiService.getMediumArticles().subscribe((data:any) => {
			if (data) {
				for (let i = 0; i < data.items.length; i++) {
					// add an new object in array of objects
					this.posts.push({
						author: data.items[i].author,
						title: data.items[i].title,
						description: data.items[i].description,
						pubDate: data.items[i].pubDate,
						link: data.items[i].link,
						thumbnail: data.items[i].thumbnail,
						source: 'Medium'
					});
				}
				this.isLoading = false;
			} else {
				this.isLoading = false;
				this.snackbarService.openSnackBar('Could not retrieve medium articles', 'Dismiss');
			}
		})
		// let twitter = this.apiService.getTwitterArticles().subscribe((data:any) => {
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
		// 				source: 'Twitter'
		// 			});
		// 		}
		// 		this.isLoading = false;
		// 	} else {
		// 		this.isLoading = false;
		// 		this.snackbarService.openSnackBar('Could not retrieve twitter articles', 'Dismiss');
		// 	}
		// })
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
		Promise.all([medium]).catch(err => {
			if(err) {
				this.isLoading = false;
				this.snackbarService.openSnackBar('Could not all social data', 'Dismiss');
			}
		});
	}

}
