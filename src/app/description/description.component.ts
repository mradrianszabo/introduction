import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DESCRIPTION_ANIMATION } from '../animations/description-animation';
import { GENERAL_ANIMATION } from '../animations/general-animation';
import { MenuItem } from '../menu-item/menuItem';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
  animations: [
    DESCRIPTION_ANIMATION.setNewSelected,
    DESCRIPTION_ANIMATION.removeSelected,
    GENERAL_ANIMATION.fade,
    DESCRIPTION_ANIMATION.percentageChange,
  ]
})
export class DescriptionComponent implements OnInit, OnDestroy{
  public techFamily : MenuItem[];
  public selected : MenuItem;
  public verticalPositionModifier : number = 0;

  constructor(private routes : ActivatedRoute, private menuService : MenuService) {
    this.menuService.setMenuAsOpened();
    this.routes.params.subscribe(item => {
      this.techFamily = this.menuService.getParent(item)
      this.selected = this.menuService.getItemByName(item)
      this.selected.isSelected = true;
    })
  }

  ngOnInit(): void {
    this.techFamily = [];
    this.setTechFamily(this.selected);

  }
  ngOnDestroy(): void{
    this.menuService.closeAll(this.selected);
  }


  setTechFamily(selected: MenuItem): void{
    for(let elem of selected.subItems){
      this.techFamily.push(elem);
      if(elem.subItems.length){
        this.setTechFamily(elem)
      }
    }
  }

  clickCard(item: MenuItem, index: number): void{
    this.verticalPositionModifier = index * 60;
    item.isSelected = true;
    this.selected.isSelected = false;
    setTimeout(()=>this.setSelected(item), 490)
    ;
  }

  setSelected(item : MenuItem){
      this.swapSelected(item);
      this.selected = item;

  }

  swapSelected(item : MenuItem){
    let index = this.techFamily.findIndex(elem => elem === item);
    this.techFamily.splice(index, 1, this.selected);
  }


}
