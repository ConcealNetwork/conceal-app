// App Variables
import { environment } from 'src/environments/environment';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared.module';
import { MaterialModule } from 'src/app/material.module';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ResetComponent } from './reset/reset.component';

import { NgHcaptchaModule } from 'ng-hcaptcha';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';

@NgModule({
  declarations: [
    AuthComponent,
    SigninComponent,
    SignupComponent,
    ResetComponent
  ],
  imports: [
		SharedModule,
		AuthRoutingModule,
		MaterialModule,
		FormsModule,
    ReactiveFormsModule,
		NgHcaptchaModule.forRoot({
			siteKey: environment.recaptcha.siteKey
		}),
  ],
	providers: [
		Clipboard,
	]
})

export class AuthModule { }