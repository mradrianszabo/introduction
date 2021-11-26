import { Component, HostListener, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { GENERAL_ANIMATION } from './animations/general-animation';
import { MENU_ANIMATION } from './animations/menu-animation';
import { ROUTER_ANIMATION } from './animations/router-animation';
import { PdfData, PdfService } from './pdf.service';
import { ResolutionService } from './resolution.service';
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
  public pdfData: PdfData;
  public isScreenSmall: boolean;
  public menuStatusSubscription : Subscription;

  constructor(private menuService : MenuService, private pdfService : PdfService, private resolutionService : ResolutionService){
  }

  prepareRoute(outlet: RouterOutlet){
    return outlet?.activatedRouteData?.['animation'];
  }

  ngOnInit(){
    this.observeResolution();
    this.subscribeMenuStatus();
    this.pdfService.pdfData.subscribe(params=>this.pdfData = params);
  }

  @HostListener('window:resize', ['$event'])
  observeResolution(){
    this.isScreenSmall = window.innerWidth <=1000 ? true : false;
    this.isScreenSmall ? this.menuStatusSubscription?.unsubscribe() : this.subscribeMenuStatus();
  }

  private subscribeMenuStatus(){
    this.menuStatusSubscription = this.menuService.menuStatus.subscribe(param=>this.menuStatus = param);
  }

}
