import { Component, OnInit } from '@angular/core';
import { ThemingService } from '../../../shared/services/theming.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	themes: string[] = [];

  constructor(
		private theming: ThemingService
	) { }

  ngOnInit(): void {
		this.themes = this.theming.themes;
	}

	changeTheme(theme: string) {
    this.theming.theme.next(theme);
  }

}