import { Injectable, NgZone } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';

// Declare objects for Cordova
declare let window: any, device: any;

@Injectable()

export class CordovaService {

   private resume: BehaviorSubject<boolean>;

   constructor(private zone: NgZone) {
		this.resume = new BehaviorSubject<boolean>(false);
		fromEvent(document, 'resume').subscribe(() => {
			this.zone.run(() => {
				this.onResume();
			});
		});
	}

  get cordova(): any {
    return window.cordova;
	}

	get device(): any {
		return device;
	}

  get onCordova(): Boolean {
    return !!window.cordova;
  }

   public onResume(): void {
    this.resume.next(true);
  }

}