import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Services
import { DataService } from 'src/app/shared/services/data.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

	isLoading: boolean = false;
	returnURL: string = '';

  constructor(
		private authService: AuthService,
		private dataService: DataService,
		private snackbarService: SnackbarService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	form: FormGroup = new FormGroup({
		usernameFormControl: new FormControl('', [
      Validators.minLength(3),
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
		if(this.form.valid) {
			this.isLoading = true;
			this.authService.signUpUser(
				this.form.value.usernameFormControl,
				this.form.value.emailFormControl,
				this.form.value.passwordFormControl
			).subscribe((data: any) => {
				if (data.result === 'success') {
					this.isLoading = false;
					this.changeAuthType('signIn');
					this.snackbarService.openSnackBar('Account Created! Please check your email to activate.', 'Dismiss');
				}	else {
					this.isLoading = false;
					this.snackbarService.openSnackBar(data.message, 'Dismiss');
				}
			});
		}
	}

  ngOnInit(): void {
		this.route.queryParams.subscribe(x => {this.returnURL = x.return});
	}

}
