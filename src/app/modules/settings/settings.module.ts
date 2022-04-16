// App Variables
import { environment } from 'src/environments/environment';

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgHcaptchaModule } from 'ng-hcaptcha';

import { SharedModule } from 'src/app/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';


@NgModule({
  declarations: [
    SettingsComponent
  ],
  imports: [
		SharedModule,
		MaterialModule,
    SettingsRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		NgHcaptchaModule.forRoot({
			siteKey: environment.recaptcha.siteKey
		}),
  ]
})
export class SettingsModule { }
