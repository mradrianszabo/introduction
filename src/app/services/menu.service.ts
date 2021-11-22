import { EventEmitter, Injectable } from '@angular/core';
import { Category, ItemLevel, MenuItem } from '../menu-item/menuItem';
import { SideMenuCard } from '../side-menu-card/side-menu-card';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private mainMenu: MenuItem;
  public menuStatus : EventEmitter<boolean> = new EventEmitter();


  constructor() {
    this.mainMenu = new MenuItem('main', 'none',0, ItemLevel.Beginner, Category.Tech, null, false);
    let quarter1 = new MenuItem('techStack', 'blabla', 0, ItemLevel.Beginner, Category.Tech);
        let item21 = new MenuItem('Angular', 'blabla', 15, ItemLevel.Advance, Category.Tech, '/assets/images/angularLogo.png');
        let item211 = new MenuItem('Material', 'blabla', 100, ItemLevel.Beginner, Category.Tech, '/assets/images/materialLogo.png');
        let item212 = new MenuItem('Ngrx', 'blabla', 70, ItemLevel.Beginner, Category.Tech, '/assets/images/ngrxLogo.png');

        let item22 = new MenuItem('Ts', 'blabla', 100, ItemLevel.Beginner, Category.Tech, '/assets/images/tsLogo.png');
        let item23 = new MenuItem('Rxjs', 'blabla', 70, ItemLevel.Beginner, Category.Tech, '/assets/images/rxjsLogo.png');
    console.log( JSON.stringify(item21))
    let item1 = new MenuItem('Other', 'blabla', 100, ItemLevel.Beginner, Category.Tech);
    let item11 = new MenuItem('Git', 'blabla', 70, ItemLevel.Beginner, Category.Tech);
    let item12 = new MenuItem('Paradigms', 'blabla', 10, ItemLevel.Advance, Category.Tech);
    let item13 = new MenuItem('Data structures &Algorithms', 'blabla', 100, ItemLevel.Advance, Category.Tech);

    let item2 = new MenuItem('Js', 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi dolorem rerum modi magni perspiciatis culpa porro repudiandae dolor laudantium cumque id accusantium, natus cupiditate hic at nostrum veniam rem suscipit.Ut, quos sapiente quidem vel nesciunt dolorem asperiores eum optio iusto earum voluptatum expedita officia odit error nostrum recusandae impedit laborum. Magni corrupti corporis repellendus inventore sunt molestias, soluta laudantium.Itaque provident dignissimos ratione eveniet magni cupiditate illo deserunt, exercitationem culpa consequatur atque tenetur quasi id necessitatibus fugiat cum perferendis excepturi nobis. Molestias voluptatum impedit exercitationem praesentium nisi perspiciatis explicabo.', 50, ItemLevel.Advance, Category.Tech, '/assets/images/jsLogo.png');
    let item4 = new MenuItem('Html', 'blabla', 100, ItemLevel.Beginner, Category.Tech, '/assets/images/htmlLogo.png');
    let item3 = new MenuItem('Css', 'blabla', 30, ItemLevel.Advance, Category.Tech, '/assets/images/cssLogo.png');
        let item33 = new MenuItem('Sass', 'bla', 30, ItemLevel.Beginner, Category.Tech, '/assets/images/sassLogo.png');




    item21.subItems.push(item211, item212)
    item3.subItems.push(item33);
    item1.subItems.push(item11, item12, item13);
    item2.subItems.push(item21, item22, item23);
    quarter1.subItems.push(item1, item3, item4, item2);

    let quarter2 = new MenuItem('personal', 'blabla', 0, ItemLevel.Beginner, Category.Personal);
    let aitem21 = new MenuItem('hobbi', 'blabla', 15, ItemLevel.Advance, Category.Personal);
    let aitem211 = new MenuItem('hobbi1', 'blabla', 100, ItemLevel.Beginner, Category.Personal);
    let aitem212 = new MenuItem('hobbi2', 'blabla', 70, ItemLevel.Beginner, Category.Personal);
    let aitem2 = new MenuItem('hobbi3', 'blabla', 50, ItemLevel.Advance, Category.Personal);
    let aitem4 = new MenuItem('hobbi4', 'blabla', 100, ItemLevel.Beginner, Category.Personal);
    let aitem3 = new MenuItem('hobbi5', 'blabla', 30, ItemLevel.Advance, Category.Personal);
    let aitem22 = new MenuItem('hobbi6', 'blabla', 100, ItemLevel.Beginner, Category.Personal);
    let aitem23 = new MenuItem('hobbi7', 'blabla', 70, ItemLevel.Beginner, Category.Personal);

    let aitem1 = new MenuItem('hobbi8', 'blabla', 100, ItemLevel.Beginner, Category.Personal);
    let aitem11 = new MenuItem('hobbi9', 'blabla', 70, ItemLevel.Beginner, Category.Personal);
    let aitem12 = new MenuItem('hobbi10', 'blabla', 10, ItemLevel.Advance, Category.Personal);

    quarter2.subItems.push(aitem1, aitem2, aitem3);
    aitem1.subItems.push(aitem11, aitem12);
    aitem21.subItems.push(aitem211, aitem212);
    aitem2.subItems.push(aitem21, aitem22, aitem23);

    let quarter3 = new MenuItem('future', 'blabla', 0, ItemLevel.Beginner, Category.Future);
    let bitem21 = new MenuItem('future1', 'blabla', 15, ItemLevel.Advance, Category.Future);
    let bitem211 = new MenuItem('future1', 'blabla', 100, ItemLevel.Beginner, Category.Future);
    let bitem212 = new MenuItem('future2', 'blabla', 70, ItemLevel.Beginner, Category.Future);
    let bitem2 = new MenuItem('future3', 'blabla', 50, ItemLevel.Advance, Category.Future);
    let bitem4 = new MenuItem('future4', 'blabla', 100, ItemLevel.Beginner, Category.Future);
    let bitem3 = new MenuItem('future5', 'blabla', 30, ItemLevel.Advance, Category.Future);
    let bitem22 = new MenuItem('future6', 'blabla', 100, ItemLevel.Beginner, Category.Future);
    let bitem23 = new MenuItem('future7', 'blabla', 70, ItemLevel.Beginner, Category.Future);

    let bitem1 = new MenuItem('future8', 'blabla', 100, ItemLevel.Beginner, Category.Future);
    let bitem11 = new MenuItem('future9', 'blabla', 70, ItemLevel.Beginner, Category.Future);
    let bitem12 = new MenuItem('future10', 'blabla', 10, ItemLevel.Advance, Category.Future);

    quarter3.subItems.push(bitem1, bitem2, bitem3);
    bitem1.subItems.push(bitem11, bitem12);
    bitem21.subItems.push(bitem211, bitem212);
    bitem2.subItems.push(bitem21, bitem22, bitem23);


    this.mainMenu.subItems.push(quarter1, quarter2, quarter3);

   }

   public getMenu(){
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
