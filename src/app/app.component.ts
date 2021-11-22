import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { GENERAL_ANIMATION } from './animations/general-animation';
import { MENU_ANIMATION } from './animations/menu-animation';
import { ROUTER_ANIMATION } from './animations/router-animation';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    ROUTER_ANIMATION.fromTechMap,
    MENU_ANIMATION.expand,
    GENERAL_ANIMATION.fade,
  ]
})
export class AppComponent implements OnInit{

  title = 'introduction';
  public menuStatus: boolean = false;

  prepareRoute(outlet: RouterOutlet){
    return outlet?.activatedRouteData?.['animation'];
  }

  constructor(private menuService : MenuService){

  }
  ngOnInit(){
    this.menuService.menuStatus.subscribe(param=>this.menuStatus = param);
  }


}
