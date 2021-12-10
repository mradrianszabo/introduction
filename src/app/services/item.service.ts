import { Injectable } from '@angular/core';
import { Category, MenuItem } from '../menu-item/menuItem';

export interface ItemStyleInterface{
  top: string,
  left: string,
  width: string,
  height: string
}
export interface ItemAddition{
  style: ItemStyleInterface,
  svgPosition : string
}

const ANGLEINRADIANT = Math.PI * 1/180;
const ITEMD = 10;

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private start : number;

  constructor() {}

  public getPositionOfSubitems( items : MenuItem[], parentRadius : number, parentIndex : number, depth : number) : Map<MenuItem, ItemAddition>{
    let itemMap: Map<MenuItem, ItemAddition> = new Map();
    let sizeOfItems = this.getSizeOfItems(items);
    this.start = this.getStartPointOnArc(items[0], sizeOfItems[0], parentIndex, depth+1);
    this.addElementsToMap(items, itemMap, sizeOfItems, parentRadius, depth+1);

    return itemMap;
  }

  private getSizeOfItems(items: MenuItem[]) : number[]{
    let itemSize : number[]= [];
    for(let item of items){
      let level = item.percentage ? item.itemLevel : 3
      itemSize.push(ITEMD*(1 + item.percentage/100 + level)/2);
    }
    return itemSize;
  }

  private getStartPointOnArc(firstItem : MenuItem, firstItemSize : number, parentIndex : number, depth : number) : number{
    return firstItem.category === Category.Tech
    ? firstItem.category + firstItemSize + parentIndex * 10 + depth * 20
    : (firstItem.category + firstItemSize - parentIndex *10) - (depth-1) *5;
  }

  private addElementsToMap(items : MenuItem[], itemMap : Map<MenuItem, ItemAddition>, sizeOfItems : number[], parentRadius : number, depth : number) : void{
    for(let [index, item] of items.entries()){
      let itemSize = sizeOfItems[index];
      let positions = this.calculatePosition(itemSize, parentRadius, depth, index, item.category);
      let itemPosition = positions.itemPos;
      let svgPosition = positions.lineSvg;
      let style = this.getItemStyleObject(itemPosition, itemSize, item.imageUrl);

      itemMap.set(item, {style, svgPosition});

      this.start+= this.getDistanceOfNextItemOnArc(item.category, depth, sizeOfItems, index);
    }
  }

  private calculatePosition(itemSize : number, parentRadius : number, depth : number, index : number, category : number){
    let radius = this.getDistanceBetweenItemAndParent(depth, category, index, itemSize, parentRadius);
    let posX = (radius * Math.cos(ANGLEINRADIANT * this.start) + parentRadius) ;
    let posY = (radius * Math.sin(ANGLEINRADIANT * this.start) + parentRadius) ;
    let svgLine = this.getSvgLinePath( itemSize, posX, posY, parentRadius);

    return {itemPos: {'top' : posY+'px', 'left' : posX+'px'}, lineSvg : svgLine};
  }

  private getItemStyleObject(position, size : number, background : string){
    return {'top' : position.top, 'left' : position.left, 'width' : size+'px', 'height' : size+'px', 'background-image' : `url('${background}')`}
  }

  private getDistanceOfNextItemOnArc(category : number, depth : number, sizeOfItems : number[], index : number) : number{
    let sizeOfItem = sizeOfItems[index];
    let sizeOfNext = sizeOfItems[index+1];

    if(category === Category.Tech){
      let modifier = 1.2/(depth+1);
      let min = sizeOfItem + sizeOfNext;
      let max = (sizeOfItem*2.5 + sizeOfNext) * modifier;
      return this.getRandomNumber(min, max);
    }else{
      let modifier = (depth*0.9);
      let min = (sizeOfItem + sizeOfNext)/1.4;
      let max = (sizeOfItem + sizeOfNext) * modifier;
      return this.getRandomNumber(min, max);
    }
  }

  private getDistanceBetweenItemAndParent(depth : number, category : number, index : number, itemSize : number, parentRadius : number) : number{
    let isOdd = depth%2 ? 1 : 2.5
    let isIndexOdd = category === Category.Tech ? index%2 ? 1 : 1.8 : index%2 ? 1.5 : 0.8
    let modifier = isOdd + isIndexOdd;
    let min = (itemSize + parentRadius) * (modifier/2);
    let max = itemSize + parentRadius;
    let radius = (Math.random() * (max - min) + min) * modifier;
    return radius
  }

  private getRandomNumber(min : number, max : number) : number{
    return Math.random() * (max - min) + min;
  }

  private getSvgLinePath(size : number, x : number, y : number, parentRadius : number){
    return `M ${parentRadius},${parentRadius} L ${x+size/2}, ${y+size/2}`;
  }

}
