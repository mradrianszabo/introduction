import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MENU_ITEM_ANIMATION } from '../animations/menu-item-animation';
import { ItemAddition, ItemService, } from '../services/item.service';
import { MenuService } from '../services/menu.service';
import { MenuItem } from './menuItem';



@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
  animations: [
    MENU_ITEM_ANIMATION.highlightLine,
    MENU_ITEM_ANIMATION.highlightItem
  ]
})
export class MenuItemComponent implements OnInit, OnDestroy {
  public itemMap :  Map<MenuItem, ItemAddition>;
  @Input() public menuItem: MenuItem;
  @Input() public parentRadius : number;
  @Input() public index: number;
  @Input() public depth: number;
  public itemRadius: number;

  constructor(private itemService : ItemService, private menuService : MenuService, private router : Router) {

  }

  ngOnInit(): void {
    if(!!this.menuItem.subItems.length){
      this.itemMap = this.itemService.getMapToItems(this.menuItem.subItems, this.parentRadius, this.index, this.depth);

    }
  }
  ngOnDestroy(): void {
    this.menuService.closeAll();
  }

  public getRadius(item: MenuItem) : number{
    return parseInt(this.itemMap.get(item).style.width)/2;
  }

  inspecting(item: MenuItem){
    item.isInspected = !item.isInspected;
    if(item.subItems.length){
      for(let subitem of item.subItems){
        this.inspecting(subitem);
      }
    }
  }

  selectItem(selected: MenuItem){
    selected.isSelected = true;
    this.menuService.setSelected(selected);
    let length = this.menuService.getSelectionLength()
    console.log('fos', length)
    setTimeout(() => {
      //this.menuService.emitMenuStatus(false);
      this.navigateToSelected(selected)
    }, length * 150);
    this.menuService.resetSelectionLength();
  }

  navigateToSelected(item){
    this.router.navigate(['/description/', item.name])
  }

}
