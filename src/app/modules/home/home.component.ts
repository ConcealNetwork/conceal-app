// Angular Core
import { Component, OnInit } from '@angular/core';

// Services
import { ApiService } from '../../shared/services/api.service';
import { ThemingService } from './../../shared/services/theming.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
		})
	}

}
