import { Component, OnInit, AfterViewInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgHcaptchaService } from 'ng-hcaptcha';

// Services
import { DataService } from 'src/app/shared/services/data.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements AfterViewInit, OnInit {

	isLoading: boolean = false;
	returnURL: string = '';
	loginTypes: string[] = ['Email Address', 'Username'];

  constructor(
		private authService: AuthService,
		private dataService: DataService,
		private snackbarService: SnackbarService,
		private route: ActivatedRoute,
		private zone: NgZone,
		private hcaptchaService: NgHcaptchaService
	) { }

	login: FormGroup = new FormGroup({
		loginTypeFromControl: new FormControl('', [
      Validators.required
    ]),
	});

	form: FormGroup = new FormGroup({
    passwordFormControl: new FormControl('', [
      Validators.required
    ]),
		displayNameFormControl: new FormControl('', [
      Validators.required
    ])
	});

	changeAuthType(type: string) {
    this.dataService.announceAuthType(type);
  }

	submit() {
		if(this.form.valid) {
			this.isLoading = true;
			this.hcaptchaService.verify().subscribe(
				(result) => {
					this.authService.signUpUser(
						this.form.value.displayNameFormControl,
						this.form.value.emailFormControl || this.form.value.usernameFormControl,
						this.form.value.passwordFormControl,
						result
					).subscribe((data: any) => {
						if (data.result === 'success') {
							this.isLoading = false;
							this.changeAuthType('signIn');
							if (this.login.value.loginTypeFromControl === 'Email Address') {
								this.zone.run(() => {
									this.snackbarService.openSnackBar('Account created... Please check your email to activate.', 'Dismiss');
								});
							} else {
								this.zone.run(() => {
									this.snackbarService.openSnackBar('Account created...', 'Dismiss');
								});
							}
						}	else {
							this.isLoading = false;
							this.zone.run(() => {
								this.snackbarService.openSnackBar(data.message, 'Dismiss');
							});
						}
					})
				},
				(err) => {
					this.zone.run(() => {
						this.snackbarService.openSnackBar(err, 'Dismiss');
					});
				},
				() => {
					console.log('hCaptcha Completed');
				}
			)
		}
	}

	ngAfterViewInit(): void {
		this.login.valueChanges.subscribe(x => {
			if (this.login.value.loginTypeFromControl === 'Email Address') {
				this.form.removeControl('usernameFormControl');
				this.form.addControl('emailFormControl', new FormControl('', [
					Validators.email,
					Validators.required
				]));
			}
			if (this.login.value.loginTypeFromControl === 'Username') {
				this.form.removeControl('emailFormControl');
				this.form.addControl('usernameFormControl', new FormControl('', [
					Validators.minLength(4),
					Validators.maxLength(24),
					Validators.pattern('^[A-Za-z_-][A-Za-z0-9_-]*$'),
					Validators.required
				]));
			}
		})
	}

  ngOnInit(): void {
		this.route.queryParams.subscribe(x => {this.returnURL = x.return});
	}

}
