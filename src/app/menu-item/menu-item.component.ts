import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MENU_ITEM_ANIMATION } from '../animations/menu-item-animation';
import { ItemAddition, ItemService, } from '../services/item.service';
import { MenuService } from '../services/menu.service';
import { MenuItem } from './menuItem';



@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
  animations: [
    MENU_ITEM_ANIMATION.highlightLine,
    MENU_ITEM_ANIMATION.highlightItem
  ]
})
export class MenuItemComponent implements OnInit{
  public itemMap :  Map<MenuItem, ItemAddition>;
  @Input() public menuItem: MenuItem;
  @Input() public parentRadius : number;
  @Input() public index: number;
  @Input() public depth: number;

  constructor(private itemService : ItemService, private menuService : MenuService, private router : Router) {

  }

  ngOnInit(): void {
    if(!!this.menuItem.subItems.length){
      this.itemMap = this.itemService.getPositionOfSubitems(this.menuItem.subItems, this.parentRadius, this.index, this.depth);
    }
  }

  public getRadius(item: MenuItem) : number{
    return parseInt(this.itemMap.get(item).style.width)/2;
  }

  public inspecting(item: MenuItem) : void{
    this.highlightInspectedFamily(item);
    item.isInspected
      ?this.menuService.nextSummary({name : item.name, itemLevel : item.itemLevel, percentage : item.percentage, hasFile : item.fileUrl ? true : false})
      :this.menuService.nextSummary(null);
  }

  public selectItem(selected: MenuItem) : void{
    this.menuService.nextSummary(null);
    selected.isSelected = true;
    this.menuService.setSelected(selected);
    let length = this.menuService.getSelectionLength()
    setTimeout(() => {
      this.navigateToSelected(selected)
    }, length * 150);
    this.menuService.resetSelectionLength();
  }

  navigateToSelected(item : MenuItem) : void{
    this.router.navigate(['/description/', item.name])
  }

  private highlightInspectedFamily(item: MenuItem) : void{
    item.isInspected = !item.isInspected;
    if(item.subItems.length){
      for(let subitem of item.subItems){
        this.highlightInspectedFamily(subitem);
      }
    }
  }
}
