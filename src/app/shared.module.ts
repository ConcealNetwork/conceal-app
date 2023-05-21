// Angular Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@ngbracket/ngx-layout';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { NgPipesModule } from 'ngx-pipes';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';

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
		HTTP,
		Clipboard
	]
})

export class SharedModule {}