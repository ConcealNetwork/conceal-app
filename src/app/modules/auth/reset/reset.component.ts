import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgHcaptchaService } from 'ng-hcaptcha';

// Services
import { DataService } from 'src/app/shared/services/data.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-auth-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

	isLoading: boolean = false;
	returnURL: string = '';

  constructor(
		private authService: AuthService,
		private dataService: DataService,
		private snackbarService: SnackbarService,
		private route: ActivatedRoute,
		private hcaptchaService: NgHcaptchaService,
	) { }

	form: FormGroup = new FormGroup({
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
	});

	changeAuthType(type: string) {
    this.dataService.announceAuthType(type);
  }

	submit() {
		if(this.form.valid) {
			this.isLoading = true;
			this.hcaptchaService.verify().subscribe(
				(result) => {
					this.authService.resetPassword(
						this.form.value.emailFormControl, result
					).subscribe((data: any) => {
						if (data.result === 'success') {
							this.isLoading = false;
							this.changeAuthType('signIn');
							this.snackbarService.openSnackBar('Password Reset! Check your email to change your password.', 'Dismiss');
						}	else {
							this.isLoading = false;
							this.snackbarService.openSnackBar(data.message, 'Dismiss');
						}
					})
				}
			)
		}
	}

  ngOnInit(): void {
		this.route.queryParams.subscribe(x => {this.returnURL = x.return});
	}

}
