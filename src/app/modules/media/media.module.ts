import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';
import { MaterialModule } from 'src/app/material.module';

import { MediaRoutingModule } from './media-routing.module';
import { MediaComponent } from './media.component';
import { ArticleDialog } from './dialogs/article/article.dialog';

@NgModule({
  declarations: [
    MediaComponent,
		ArticleDialog
  ],
  imports: [
    MediaRoutingModule,
		SharedModule,
		MaterialModule
  ]
})
export class MediaModule { }
