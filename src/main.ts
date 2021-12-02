import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

declare let window: any;

if (environment.production) {
  enableProdMode();
}

const bootstrap = () => {
  platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));
};

// wait for cordova to load
if (typeof window.cordova !== 'undefined') {
  document.addEventListener('deviceready', () => {
		console.log('loading with cordova');
    bootstrap();
  }, false);
} else {
	console.log('loading without cordova');
  bootstrap();
}