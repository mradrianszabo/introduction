import { Component,  ElementRef,  EventEmitter,  OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { Observable } from 'rxjs';
import { GENERAL_ANIMATION } from '../animations/general-animation';
import { MENU_ANIMATION } from '../animations/menu-animation';
import { MENU_ITEM_ANIMATION } from '../animations/menu-item-animation';
import { MenuItem } from '../menu-item/menuItem';
import { CardService } from '../services/card.service';
import { ItemService, ItemStyleInterface } from '../services/item.service';
import { MenuService } from '../services/menu.service';
import { ResolutionService } from '../services/resolution.service';
import { SideMenuCard } from '../side-menu-card/side-menu-card';



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
    this.menuService.getMenu().subscribe(data=> this.menu = data);
    this.isMobile = this.resolutionService.getIsMobile();
  }

  public toggleTechMap(){
    this.menu.isOpen = !this.menu.isOpen;
  }




}
