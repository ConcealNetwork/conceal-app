import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

	@Output() sideNavClosed = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

	close() {
		this.sideNavClosed.emit(); // Emit event to parent component so it can tell sidenav to close
	}

}
