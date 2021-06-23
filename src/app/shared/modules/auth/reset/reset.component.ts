import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Services
import { DataService } from '../../../services/data.service';
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-auth-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  constructor(
		private authService: AuthService,
		private dataService: DataService,
		private router: Router
	) { }

	reset: FormGroup = new FormGroup({
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
	});

	changeAuthType(type: string) {
    this.dataService.announceAuthType(type);
  }

	submit() {}

  ngOnInit(): void { }

}
