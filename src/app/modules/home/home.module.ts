import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared.module';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ArticleDialog } from './dialogs/article/article.dialog';

@NgModule({
  declarations: [
    HomeComponent,
		ArticleDialog
  ],
  imports: [
    HomeRoutingModule,
		SharedModule,
		MatCardModule,
		MatIconModule,
		MatButtonModule
  ]
})
export class HomeModule { }
