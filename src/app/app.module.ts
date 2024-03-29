// App Variables
import { environment } from 'src/environments/environment';

// Angular Core
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// 3rd Party
import { JwtModule } from "@auth0/angular-jwt";

// Modules
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared.module';

// Services
import { HttpInterceptorService } from "./shared/services/exception.interceptor";
import { ThemingService } from './shared/services/theming.service';
import { CordovaService } from './shared/services/cordova.service';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { MobileFooterComponent } from './shared/components/footer/mobile-footer.component';
import { MobileHeaderComponent } from './shared/components/header/mobile-header.component';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { TwoFactorDialog } from "./shared/dialogs/twofactor/twofactor.component";

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
	declarations: [
		AppComponent,
    HeaderComponent,
    SidenavComponent,
		FooterComponent,
    MobileFooterComponent,
		MobileHeaderComponent,
		TwoFactorDialog
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		MaterialModule,
		SharedModule,
		HttpClientModule,
		BrowserAnimationsModule,
		ServiceWorkerModule.register('ngsw-worker.js', {
			enabled: !isDevMode() || environment.worker,
			// Register the ServiceWorker as soon as the application is stable
			// or after 30 seconds (whichever comes first).
			registrationStrategy: 'registerWhenStable:30000'
		}),
		JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["api.wallet.conceal.network"],
        headerName: "token",
        authScheme: ""
      },
    }),
	],
	providers: [
		ThemingService,
		CordovaService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
	bootstrap: [AppComponent]
})

export class AppModule { }
