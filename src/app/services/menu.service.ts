import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Category, ItemLevel, MenuItem } from '../menu-item/menuItem';
import { SideMenuCard } from '../side-menu-card/side-menu-card';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private mainMenu: MenuItem;
  public menuStatus : EventEmitter<boolean> = new EventEmitter();


  constructor(private http : HttpClient) {
    this.getMenu()
   }


   public getMenu(){
    return this.http.get('/assets/data/techStack.json')
    .pipe(
      map(data=>{
        return this.getConvertedMenu(data);
      })
    )

   }

   private convertToRating(raw){
    return new MenuItem(raw.name, raw.description, raw.percentage, raw.itemLevel, raw.category, raw.imageUrl, raw.isOpen, raw.isInspected, raw.isSelected, [])
   }

   private getConvertedMenu(raw, parent?: MenuItem){
    let converted = this.convertToRating(raw);
    if(!!parent){
      parent.subItems.push(converted)
    }else{
      this.mainMenu = converted;
    }
    if(!!raw.subItems.length){
      for(let item of raw.subItems){
        this.getConvertedMenu(item, converted);
      }
    }
    return this.mainMenu;
   }

  public getSideBarCards(){
    let cards = [];
    cards.push(
      new SideMenuCard(
        'Skill map',
        'skillMap',
        (dependency)=>{dependency.setMenuAsOpened()}
        ),
      new SideMenuCard(
        'About me',
        'aboutMe'
      ),
      new SideMenuCard(
        'Rate me',
        'rateMe'
      )
    )
    return cards;
  }


   private selectionChainLength = 0;
 public setSelected(  selected : MenuItem, parent : MenuItem = this.mainMenu) : void | number{
  if(parent.subItems.find(item=> item === selected)){
    parent.isSelected = true;
    this.selectionChainLength++;
    return this.setSelected(parent);
  }
    for(let item of parent.subItems){
      this.setSelected(selected, item);
  }
  if(parent === selected){
    return;
  }
}


public getSelectionLength(){
  return this.selectionChainLength;
}
public resetSelectionLength(){
  this.selectionChainLength = 0;
}
 private parentResult;
public getParent(selected, parent = this.mainMenu){
  if(parent.subItems.find(elem=>elem.name === selected.name)){
    return parent
  }
  for(let elem of parent.subItems){
    let result = this.getParent(selected, elem);
    if(result){
      return result;
    }
  }
}
public getItem(selected, parent = this.mainMenu){
  let result = parent.subItems.find(elem => selected.name === elem.name);
  if(result){
    return result
  }
  for(let elem of parent.subItems){
    let result = this.getItem(selected, elem);
    if(result){
      return result
    }
  }
}
public closeAll(item : MenuItem = this.mainMenu){
  if(item.isInspected || item.isSelected){

    item.isInspected = item.isSelected = false;

    if(item.subItems.length){
      for(let subitem of item.subItems){
        if(subitem.isInspected || subitem.isSelected)
        this.closeAll(subitem);
      }
    }
  }else{return}
}

public emitMenuStatus(status : boolean){
  this.menuStatus.emit(status);
}
public setMenuAsOpened(){
  this.mainMenu.isOpen = true;
  this.emitMenuStatus(true);
}

}
