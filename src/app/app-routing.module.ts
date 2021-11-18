import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DescriptionComponent } from './description/description.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { RateMeComponent } from './rate-me/rate-me.component';

const routes: Routes = [
  {path: 'techMap', component : MainMenuComponent, data : { animation : 'techMap'}},
  {path: 'description/:name', component : DescriptionComponent, data : { animation : 'selectedTech'}},
  {path: 'rateMe', component : RateMeComponent, data : { animation : 'rateMe'}},

  {path : '**', redirectTo: 'techMap'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
