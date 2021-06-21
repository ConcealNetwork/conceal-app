import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Services
import { AuthService } from '../../../../shared/services/auth.service';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

	isLoading: boolean = false;

  constructor(
		private authService: AuthService,
		private router: Router
	) { }

	signIn: FormGroup = new FormGroup({
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

	submit() {
		this.isLoading = true;
		if(this.signIn.valid) {
			this.authService.login(
				this.signIn.value.emailFormControl,
				this.signIn.value.passwordFormControl,
				this.signIn.value.twofaFormControl
			).subscribe(
				(data: any) => {
					if (data.message.token && data.result === 'success') {
						this.authService.setToken(data.message.token);
						this.isLoading = false;
						this.router.navigate(['/']);
					}
					else {
						this.isLoading = false;
						console.log(data.message);
					}
				},
				error => {
					this.isLoading = false;
					console.log(error.message);
				}
			)
		}
	}

  ngOnInit(): void {

	}

}
