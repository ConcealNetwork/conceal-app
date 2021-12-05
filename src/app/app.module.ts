// App Variables
import { environment } from '../environments/environment';

// Angular Core
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { PlatformModule } from '@angular/cdk/platform';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Angular Material
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';

// 3rd Party
import { JwtModule } from "@auth0/angular-jwt";
import { NgPipesModule } from 'ngx-pipes';

// Modules
import { HttpInterceptorService } from "./shared/services/exception.interceptor";
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { MobileFooterComponent } from './shared/components/footer/mobile-footer.component';
import { SidenavComponent } from './shared/components/sidenav/sidenav.component';
import { TwoFactorDialog } from "./shared/dialogs/twofactor/twofactor.component";

// Services
import { ThemingService } from './shared/services/theming.service';
import { CordovaService } from './shared/services/cordova.service';

export function tokenGetter() {
  return localStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidenavComponent,
    MobileFooterComponent,
		TwoFactorDialog
  ],
  imports: [
    BrowserModule,
		PlatformModule,
    AppRoutingModule,
		SharedModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable or after 30 seconds (whichever comes first).
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
    LayoutModule,
		MatAutocompleteModule,
		HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
		MatMenuModule,
		FlexLayoutModule,
		MatSnackBarModule,
		MatDialogModule,
		MatTooltipModule,
		NgPipesModule
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