// App Variables
import { environment } from 'src/environments/environment';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { SharedModule } from 'src/app/shared.module';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ResetComponent } from './reset/reset.component';

import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module, RecaptchaFormsModule } from 'ng-recaptcha';
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
		MatButtonModule,
		MatInputModule,
		MatRadioModule,
		MatCardModule,
		MatIconModule,
		FormsModule,
    ReactiveFormsModule,
		RecaptchaV3Module,
		RecaptchaFormsModule
  ],
	providers: [
		Clipboard,
		{
			provide: RECAPTCHA_V3_SITE_KEY,
			useValue: environment.recaptcha.siteKey,
		},
	]
})

export class AuthModule { }