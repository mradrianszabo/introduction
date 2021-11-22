import { Component,  ElementRef,  EventEmitter,  OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import { GENERAL_ANIMATION } from '../animations/general-animation';
import { MENU_ANIMATION } from '../animations/menu-animation';
import { MENU_ITEM_ANIMATION } from '../animations/menu-item-animation';
import { MenuItem } from '../menu-item/menuItem';
import { CardService } from '../services/card.service';
import { ItemService, ItemStyleInterface } from '../services/item.service';
import { MenuService } from '../services/menu.service';
import { SideMenuCard } from '../side-menu-card/side-menu-card';



@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css'],
  animations: [
    MENU_ITEM_ANIMATION.expand,
    MENU_ANIMATION.cardContainer,
    GENERAL_ANIMATION.fade,
  ]
})
export class MainMenuComponent implements OnInit {

  public menu : MenuItem
  public sideMenuCards : SideMenuCard[] = [];

  constructor(private menuService : MenuService, private cardService : CardService) {
    this.menu = this.menuService.getMenu();
   }

  ngOnInit(): void {
    this.setSideBarCards();
  }

  public toggleTechMap(){
    this.menu.isOpen = !this.menu.isOpen;
    this.menuService.emitMenuStatus(this.menu.isOpen);
  }

  private setSideBarCards(){
    this.sideMenuCards = this.cardService.getCards();
  }
}
