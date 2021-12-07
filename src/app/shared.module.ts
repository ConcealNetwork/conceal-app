// Angular Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { NgPipesModule } from 'ngx-pipes';

// Components
import { LoaderComponent } from './shared/components/loader/loader.component';

@NgModule({
  declarations: [
    LoaderComponent
  ],
  exports: [
		CommonModule,
    LoaderComponent,
		NgPipesModule,
		FlexLayoutModule
	],
	providers: [
		HTTP
	]
})

export class SharedModule {}