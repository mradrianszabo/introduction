import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DescriptionComponent } from './description/description.component';
import { CanActivateGuard } from './guards/can-activate.guard';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { Page404Component } from './page404/page404.component';
import { RateMeComponent } from './rate-me/rate-me.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'techMap'},
  {path: 'techMap', component : MainMenuComponent, data : { animation : 'techMap'}},
  {path: 'description/:name', component : DescriptionComponent, data : { animation : 'selectedTech'}},
  {path: 'rateMe', component : RateMeComponent, canActivate : [CanActivateGuard], data : { animation : 'rateMe', configProperty : 'isRatingInactive'}},
  {path: '404', component : Page404Component},

  {path : '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
