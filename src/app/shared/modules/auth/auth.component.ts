// Angular Core
import { Component, OnDestroy } from '@angular/core';

// 3rd Party
import { Subscription } from 'rxjs';

// Services
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnDestroy {

	subscription: Subscription;
	authType: string = 'signIn';

  constructor(private dataService: DataService) {
		this.subscription = this.dataService.authTypeAnnounce$.subscribe(
      type => { this.authType = type }
		);
	}

	ngOnDestroy() {
    // prevent memory leak when component destroyed
    this.subscription.unsubscribe();
  }

}
