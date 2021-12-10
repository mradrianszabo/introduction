import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Summary } from '../item-summary/summary';
import { MenuItem, MenuItemModel } from '../menu-item/menuItem';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private mainMenu: MenuItem;
  private selectionChainLength = 0;
  public itemSummary : Subject<Summary> = new Subject();
  public mainMenu$: ReplaySubject<MenuItem>;

  constructor(private http : HttpClient) {
    this.setMenu();
   }


   public setMenu() : void{
     if(!this.mainMenu$){
      this.mainMenu$ = new ReplaySubject<MenuItem>();
     }
    this.http.get<MenuItemModel>('/assets/data/techStack.json').pipe(map(raw=>this.getConvertedMenu(raw))).subscribe(data=>{
      this.mainMenu = data;
      this.mainMenu$.next(this.mainMenu);
    });
   }

   private convertToRating(raw : MenuItemModel) : MenuItem{
    return new MenuItem(raw.name, raw.description, raw.percentage, raw.itemLevel, raw.category, raw.imageUrl, raw.isOpen, raw.isInspected, raw.isSelected, [], raw?.fileUrl)
   }

   private getConvertedMenu(raw : MenuItemModel, parent?: MenuItem) : MenuItem{
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


public getSelectionLength() : number{
  return this.selectionChainLength;
}
public resetSelectionLength() : void{
  this.selectionChainLength = 0;
}
public getParent(selected, parent = this.mainMenu) : MenuItem | void{
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
public getItemByName(selected : MenuItem, parent : MenuItem){
  let result = parent.subItems.find(elem => selected.name === elem.name);
  if(result){
    return result
  }
  for(let elem of parent.subItems){
    let result = this.getItemByName(selected, elem);
    if(result){
      return result
    }
  }
}
public closeAll(item : MenuItem = this.mainMenu) : void{
  if(item.isInspected || item.isSelected){
    item.isInspected = item.isSelected = false;

    if(item.subItems.length){
      for(let subitem of item.subItems){
        if(subitem.isInspected || subitem.isSelected)
        this.closeAll(subitem);
      }
    }
  }else{
    return
  }
}

public setMenuAsOpened() : void{
    this.mainMenu.isOpen = true;
}


nextSummary(summaryData : Summary) : void{
  this.itemSummary.next(summaryData);
}


}
