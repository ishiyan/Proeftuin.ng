import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReviewCssComponent } from './review-css/review-css.component';
import { ReviewJsComponent } from './review-j́s/review-js.component';
import { EllipsisModule } from 'ngx-ellipsis';

@NgModule({
  imports:      [ BrowserModule, BrowserAnimationsModule, FormsModule, MatToolbarModule, FlexLayoutModule, EllipsisModule ],
  declarations: [ AppComponent, ReviewCssComponent, ReviewJsComponent],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
