import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GENERAL_ANIMATION } from '../animations/general-animation';
import { MenuItem } from '../menu-item/menuItem';
import { MenuService } from '../services/menu.service';

@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css'],
  animations: [
    GENERAL_ANIMATION.moveyeah,
    GENERAL_ANIMATION.hellyeah,
    GENERAL_ANIMATION.fade,
  ]
})
export class DescriptionComponent implements OnInit{
  public techFamily : MenuItem[];
  public selected : MenuItem;
  public kaki: boolean = false;
  public verticalPositionModifier : number = 0;

  constructor(private routes : ActivatedRoute, private menuService : MenuService) {
    this.menuService.setMenuAsOpened();
    this.routes.params.subscribe(item => {
      this.techFamily = this.menuService.getParent(item)
      this.selected = this.menuService.getItem(item)
      this.selected.isSelected = true;
    })
  }

  ngOnInit(): void {
    this.techFamily = [];
    this.setTechFamily(this.selected);

  }


  setTechFamily(selected){
    for(let elem of selected.subItems){
      this.techFamily.push(elem)
      if(elem.subItems.length){
        this.setTechFamily(elem)
      }
    }
  }

  clickCard(item, index){
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