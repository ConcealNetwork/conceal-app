// App Variables
import { environment } from 'src/environments/environment';

// Core
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {

	version: any = environment.version;
	year: number = new Date().getFullYear();

  constructor( ) { }

  ngOnInit() {

	}

}