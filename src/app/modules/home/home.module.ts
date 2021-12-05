import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { NgPipesModule } from 'ngx-pipes';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { ArticleDialog } from './dialogs/article/article.dialog';

@NgModule({
  declarations: [
    HomeComponent,
		ArticleDialog
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
		SharedModule,
		FlexLayoutModule,
		MatCardModule,
		MatIconModule,
		MatButtonModule,
		NgPipesModule
  ]
})
export class HomeModule { }
