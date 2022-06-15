import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';
import { getSupportedInputTypes, Platform, supportsPassiveEventListeners, supportsScrollBehavior } from '@angular/cdk/platform';
import { Title } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';

// 3rd Party Modules
import { Subscription } from 'rxjs';

// Services
import { ThemingService } from './shared/services/theming.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {

  themingSubscription!: Subscription;
	@HostBinding('class') className = '';

	// check platform properties
  supportedInputTypes = Array.from(getSupportedInputTypes()).join(', ');
  supportsPassiveEventListeners = supportsPassiveEventListeners();
  supportsScrollBehavior = supportsScrollBehavior();

  constructor(
		private themingService: ThemingService,
		private overlayContainer: OverlayContainer,
		public platform: Platform,
		private router: Router,
		private activatedRoute: ActivatedRoute,
		private titleService: Title,
	) {}

	getThemingService() {
		return this.themingService;
	}

	ngOnInit() {
		this.themingSubscription = this.themingService.theme.subscribe((theme: string) => {
      this.className = theme;
      this.applyThemeOnOverlays();
    });

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
			this.titleService.setTitle(ttl);
		})

		// Some random colors
		const colors = ["#FFC55C", "#FFB52E", "#D18700", "#A36A00", "#754C00"];
		const numBalls = 50;
		const balls = [];

		for (let i = 0; i < numBalls; i++) {
			let ball = document.createElement("div");
			ball.classList.add("ball");
			ball.style.background = colors[Math.floor(Math.random() * colors.length)];
			ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
			ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
			ball.style.transform = `scale(${Math.random()})`;
			ball.style.width = `${Math.random()}em`;
			ball.style.height = ball.style.width;

			balls.push(ball);
			var element = document.getElementsByClassName('container');
			element[0].prepend(ball);
		}

		// Keyframes
		balls.forEach((el, i, ra) => {
			let to = {
				x: Math.random() * (i % 2 === 0 ? -11 : 11),
				y: Math.random() * 12
			};

			let anim = el.animate(
				[
					{ transform: "translate(0, 0)" },
					{ transform: `translate(${to.x}rem, ${to.y}rem)` }
				],
				{
					duration: (Math.random() + 1) * 2000, // random duration
					direction: "alternate",
					fill: "both",
					iterations: Infinity,
					easing: "ease-in-out"
				}
			);
		});

	}

  /**
  * Apply the current theme on components with overlay (e.g. Dropdowns, Dialogs)
  */
	private applyThemeOnOverlays() {
		// remove old theme class and add new theme class
		// we're removing any css class that contains '-theme' string but your theme classes can follow any pattern
		const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
		const themeClassesToRemove = Array.from(this.themingService.themes);
		if (themeClassesToRemove.length) {
			overlayContainerClasses.remove(...themeClassesToRemove);
		}
		overlayContainerClasses.add(this.className);
	}

	ngOnDestroy() {
		this.themingSubscription.unsubscribe();
	}

}