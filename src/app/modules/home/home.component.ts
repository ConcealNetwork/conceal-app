// Angular Core
import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { Router } from '@angular/router';

// Services
import { ThemingService } from 'src/app/shared/services/theming.service';

interface Tile {
	title: string;
	description: string;
	icon: string;
	enabled?: boolean;
	actionLabel: string;
	route?: string;
	href?: string;
	target?: string;
}

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    animations: [
        trigger('transition', [
            transition(':enter', [
                query('#cards', [
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

export class HomeComponent implements OnInit {

	// Variables
	isLoading: boolean = true;
	tiles: Tile[] = [
		{
			title: 'Web Wallet',
			description: 'The Conceal Web Wallet runs in your Browser on any device, Mobile, PC or Mac!',
			icon: 'lock',
			actionLabel: 'Web Wallet',
			href: 'https://wallet.conceal.network',
			target: '_blank'
		},
		{
			title: 'Conceal Bridge',
			description: 'Facilitating the communication between two blockchain networks and aiding in the exchange of our wrapped conceal coins.',
			icon: 'swap_horizontal_circle',
			actionLabel: 'Launch Bridge',
			href: 'https://bridge.conceal.network',
			target: '_blank'
		},
		{
			title: 'Conceal Explorer',
			description: 'Access key network metrics such as circulating supply, total supply, total banked, transactions, block height and more.',
			icon: 'explore',
			actionLabel: 'Conceal Explorer',
			href: 'https://explorer.conceal.network',
			target: '_blank'
		},
        {
			title: 'Conceal Authenticator',
			description: 'A secure 2FA app that leverages the Conceal blockchain to securely backup your 2FA shared keys using a built-in lite wallet.',
			icon: 'security',
			actionLabel: 'Conceal Authenticator',
			href: 'https://authenticator.conceal.network',
			target: '_blank'
		},
        {
            title: 'Conceal MarketPlace',
            description: 'The Conceal MarketPlace is a platform where Concealers can trade goods using their CCX.',
            icon: 'store',
            actionLabel: 'Conceal MarketPlace',
			href: 'https://marketplace.conceal.network',
			target: '_blank'
		}
	];
	tileRows: Tile[][] = [];

  constructor(
		private themingService: ThemingService,
		private router: Router,
	) { }

	getThemingService() {
		return this.themingService;
	}

  ngOnInit(): void {
		this.isLoading = false;
		// Compute enabled based on available top-level routes; external links are always enabled.
		const availablePaths = new Set<string>(
			this.router.config
				.map(r => r.path)
				.filter((p): p is string => !!p)
		);
		this.tiles = this.tiles.map(tile => {
			if (tile.href) {
				return { ...tile, enabled: true };
			}
			if (tile.route) {
				const normalized = tile.route.replace(/^\//, '');
				return { ...tile, enabled: availablePaths.has(normalized) };
			}
			return { ...tile, enabled: false };
		});
		// Group tiles into rows of two for desktop layout
		this.tileRows = [];
		for (let i = 0; i < this.tiles.length; i += 2) {
			this.tileRows.push(this.tiles.slice(i, i + 2));
		}
	}

}
