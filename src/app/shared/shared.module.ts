// Angular Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

// Components
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    LoaderComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LoaderComponent,
	],
	providers: [
		HTTP
	]
})

export class SharedModule {}