import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	 // You will want to hide and show a back-arrow depending on navigation state, if linking to other components from within the components
  showBackArrow = false;

  constructor() { }

	toggleSidenav() {	}

  ngOnInit(): void {
  }

}
