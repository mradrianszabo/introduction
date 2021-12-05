import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { GENERAL_ANIMATION } from './animations/general-animation';
import { MENU_ANIMATION } from './animations/menu-animation';
import { ROUTER_ANIMATION } from './animations/router-animation';
import { PdfData, PdfService } from './services/pdf.service';
import { ResolutionService } from './services/resolution.service';
import { MenuService } from './services/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    ROUTER_ANIMATION.fromTechMap,
    MENU_ANIMATION.expand,
    GENERAL_ANIMATION.fade,
  ]
})
export class AppComponent implements OnInit{

  title = 'introduction';
  public isMobile : Observable<boolean>;

  constructor(private resolutionService : ResolutionService){
  }

  prepareRoute(outlet: RouterOutlet){
    return outlet?.activatedRouteData?.['animation'];
  }

  ngOnInit(){
    this.isMobile = this.resolutionService.getIsMobile()
  }



}
