import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Services
import { AuthService } from '../../../../shared/services/auth.service';
import { DataService } from '../../../../shared/services/data.service';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(
		private authService: AuthService,
		private dataService: DataService,
		private router: Router
	) { }

	signUp: FormGroup = new FormGroup({
		usernameFormControl: new FormControl('', [
      Validators.minLength(1),
      Validators.maxLength(24),
    ]),
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    passwordFormControl: new FormControl('', [
      Validators.required
    ])
	});

	changeAuthType(type: string) {
    this.dataService.announceAuthType(type);
  }

	submit() {
		console.log(
			this.signUp.value.emailFormControl,
			this.signUp.value.usernameFormControl,
			this.signUp.value.passwordFormControl
		);
	}

  ngOnInit(): void {
  }

}
