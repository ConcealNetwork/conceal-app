import { ApplicationRef, Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable()

export class ThemingService {

  themes = ["dark-theme", "light-theme"];
  theme = new BehaviorSubject("light-theme");

  constructor(
		private ref: ApplicationRef
	) {
    // initially trigger dark mode if preference is set to dark mode on system
    const darkModeOn = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    if(darkModeOn){
      this.theme.next("dark-theme");
    }

    // watch for changes of the preference
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
      const turnOn = e.matches;
      this.theme.next(turnOn ? "dark-theme" : "light-theme");
      this.ref.tick(); // trigger refresh of UI
    });
  }

}