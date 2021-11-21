// Angular Core
import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';

// Services
import { ApiService } from '../../shared/services/api.service';
import { ThemingService } from './../../shared/services/theming.service';

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
						animate('0.2s', style({ opacity: 1 }))
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
	) { }

	getThemingService() {
		return this.themingService;
	}

  ngOnInit(): void {
		this.getArticles();
	}

	getArticles() {
		this.apiService.getMediumArticles().subscribe((data:any) => {
			this.posts.push(...data.items);
			this.isLoading = false;
		})
	}

}
