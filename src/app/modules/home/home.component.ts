// Angular Core
import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

import * as moment from 'moment';

// Services
import { ApiService } from 'src/app/shared/services/api.service';
import { ThemingService } from 'src/app/shared/services/theming.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';
import { DialogService } from 'src/app/shared/services/dialog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
	animations: [
		trigger('listAnimation', [
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
export class HomeComponent implements OnInit {

	// Variables
	isLoading: boolean = true;
	posts: any = [];

  constructor(
		private apiService: ApiService,
		private themingService: ThemingService,
		private snackbarService: SnackbarService,
		private dialogService: DialogService,
	) { }

	getThemingService() {
		return this.themingService;
	}

  ngOnInit(): void {
		this.getArticles();
	}

	openArticle(item: string) {
		this.dialogService.openArticleDialog(item);
	}

	toDate(time: number) {
		return moment(time);
	}

	getArticles() {
		let medium = this.apiService.getMediumArticles().subscribe((data:any) => {
			if (data) {
				this.posts.push(...data.items);
				this.isLoading = false;
			} else {
				this.isLoading = false;
				this.snackbarService.openSnackBar('Could not retrieve articles', 'Dismiss');
			}
		})
		// let twitter = this.apiService.getTwitterArticles().subscribe((data:any) => {
		// 	if (data) {
		// 		this.posts.push(...data.items);
		// 		this.isLoading = false;
		// 	} else {
		// 		this.isLoading = false;
		// 		this.snackbarService.openSnackBar('Could not retrieve articles', 'Dismiss');
		// 	}
		// })
		// call wallets and deposits
		Promise.all([medium]);
	}

}
