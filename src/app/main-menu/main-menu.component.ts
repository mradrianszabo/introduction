import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GENERAL_ANIMATION } from '../animations/general-animation';
import { MENU_ITEM_ANIMATION } from '../animations/menu-item-animation';
import { MenuItem } from '../menu-item/menuItem';
import { MenuService } from '../services/menu.service';
import { ResolutionService } from '../services/resolution.service';



@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss'],
  animations: [
    MENU_ITEM_ANIMATION.expand,
    GENERAL_ANIMATION.fade,
  ]
})
export class MainMenuComponent implements OnInit {

  public menu : MenuItem
  public itemSummary;
  public isMobile : Observable<boolean>;

  constructor(private menuService : MenuService, private resolutionService : ResolutionService) {
    this.menuService.itemSummary.subscribe(data=>this.itemSummary = data);
  }

  ngOnInit() {
    this.menuService.mainMenu$.subscribe(data=> this.menu = data);
    this.isMobile = this.resolutionService.getIsMobile();
  }

  public toggleTechMap() : void{
    this.menu.isOpen = !this.menu.isOpen;
  }




}
