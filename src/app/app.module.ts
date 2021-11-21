import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DescriptionComponent } from './description/description.component';
import { SideMenuCardComponent } from './side-menu-card/side-menu-card.component';
import { SanitizePipe } from './pipes/sanitize.pipe';
import { RateMeComponent } from './rate-me/rate-me.component';
import { FormsModule } from '@angular/forms';
import { RatingIndicatorComponent } from './rate-me/rating-indicator/rating-indicator.component';
import { NotificationComponent } from './notification/notification.component';
import { RatingListComponent } from './rating-list/rating-list.component';
import { PercentageIndicatorComponent } from './percentage-indicator/percentage-indicator.component';

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    MenuItemComponent,
    DescriptionComponent,
    SideMenuCardComponent,
    SanitizePipe,
    RateMeComponent,
    RatingIndicatorComponent,
    NotificationComponent,
    RatingListComponent,
    PercentageIndicatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
