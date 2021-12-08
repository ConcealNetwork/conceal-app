import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { SharedModule } from 'src/app/shared.module';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ResetComponent } from './reset/reset.component';

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
		MatCardModule,
		MatIconModule,
		FormsModule,
    ReactiveFormsModule
  ],
	providers: [
		Clipboard
	]
})

export class AuthModule { }