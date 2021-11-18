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
  public isSaturationHigh: boolean;

  prepareRoute(outlet: RouterOutlet){
    return outlet?.activatedRouteData?.['animation'];
  }

  constructor(private menuService : MenuService, private router: Router){

  }
  ngOnInit(){
    //setInterval(()=>console.log(this.menuStatus), 1000)
    this.menuService.menuStatus.subscribe(param=>this.menuStatus = param);
  }

  setCssClasses(){
    let saturation = !this.menuStatus ? true : this.isSaturationHigh ? true : false;

    return {'menu' : true, 'menuExpanded' : this.menuStatus, 'highSaturation' : saturation }
  }

}
