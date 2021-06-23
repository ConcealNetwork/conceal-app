import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Services
import { DataService } from '../../../services/data.service';
import { AuthService } from '../../../../shared/services/auth.service';
import { SnackbarService } from '../../../../shared/services/snackbar.service';
import { DialogService } from '../../../../shared/services/dialog.service';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

	isLoading: boolean = false;
	returnURL: string = '';
	date: Date = new Date();
	timeOfDay: number = this.date.getHours();

  constructor(
		private authService: AuthService,
		private dataService: DataService,
		private snackbarService: SnackbarService,
		private dialogService: DialogService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	form: FormGroup = new FormGroup({
    emailFormControl: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    passwordFormControl: new FormControl('', [
      Validators.required
    ]),
    twofaFormControl: new FormControl('', [
      Validators.minLength(6),
      Validators.maxLength(6),
      Validators.pattern('^[0-9]*$')
    ])
	});

	changeAuthType(type: string) {
    this.dataService.announceAuthType(type);
  }

	submit() {
		if(this.form.valid) {
			this.isLoading = true;
			this.authService.login(
				this.form.value.emailFormControl,
				this.form.value.passwordFormControl,
				this.form.value.twofaFormControl
			).subscribe((data: any) => {
				if (data.message.token && data.result === 'success') {
					this.isLoading = false;
					// set auth token
					this.authService.setToken(data.message.token);
					// Check if 2fa is enabled
					this.authService.check2fa().subscribe((result: any) => {
						if(!result.message.enabled) this.dialogService.openTwoFactorDialog()
					});
					// Login message
					this.authService.getUser().subscribe((result: any) => {
						if(result.message.name) this.snackbarService.openSnackBar(`👋 ${this.timeOfDay < 12 ? 'Good morning' : 'Good evening'}, ${result.message.name} (Logged in)`, 'Dismiss')
					});
					// navigate to previous route
					this.router.navigate([this.returnURL]);
				}	else {
					this.isLoading = false;
					this.snackbarService.openSnackBar(data.message, 'Dismiss');
				}
			});
		}
	}

  ngOnInit(): void {
		this.route.queryParams.subscribe(x => {this.returnURL = x.return || ''});
	}

}
