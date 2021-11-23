import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category, ItemLevel, MenuItem } from '../menu-item/menuItem';
import { SideMenuCard } from '../side-menu-card/side-menu-card';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private mainMenu: MenuItem;
  private selectionChainLength = 0;
  public itemSummary : Subject<any> = new Subject();
  public pdfSrc : Subject<string> = new Subject();
  public menuStatus : EventEmitter<boolean> = new EventEmitter();


  constructor(private http : HttpClient) {
   }


   public async setMenu(){
    let raw = await this.http.get('/assets/data/techStack.json').toPromise();
    return this.getConvertedMenu(raw);
   }

   public async getMenu(){
    return this.mainMenu ? await this.mainMenu : await this.setMenu();
   }

   private convertToRating(raw){
    return new MenuItem(raw.name, raw.description, raw.percentage, raw.itemLevel, raw.category, raw.imageUrl, raw.isOpen, raw.isInspected, raw.isSelected, [], raw?.fileUrl)
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
public getItemByName(selected, parent = this.mainMenu){
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
public closeAll(item : MenuItem = this.mainMenu){
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

public emitMenuStatus(status : boolean){
  this.menuStatus.emit(status);
}
public setMenuAsOpened(){
  this.mainMenu.isOpen = true;
  this.emitMenuStatus(true);
}

nextSummary(summaryData){
  this.itemSummary.next(summaryData);
}

nextPdf(src : string){
  this.pdfSrc.next(src);
}

}
