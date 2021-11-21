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
  isInspected: boolean
}

const MAINRADIUS = 40;
const ANGLEINRADIANT = Math.PI * 1/180;
const ITEMD = 10;

@Injectable({
  providedIn: 'root'
})
export class ItemService {


  constructor() {

   }

  public getMapToItems( items, parentRadius, parentIndex, depth){
    depth++
    let itemMap: Map<MenuItem, ItemAddition> = new Map();
    let sizeOfItems = this.calcItemSize(items);

    let start = items[0].category === Category.Tech
      ? items[0].category + sizeOfItems[0] + parentIndex * 10 + depth * 20
      : (items[0].category + sizeOfItems[0] - parentIndex *10) - (depth-1) *5
    for(let [index, item] of items.entries()){
      let itemSize = sizeOfItems[index];
      let positions = this.calculatePosition(itemSize, start, parentRadius, depth, index, item.category);
      let itemPosition = positions.itemPos;
      let svgPosition = positions.lineSvg;
      let style = this.styleItem(itemPosition, itemSize, item.imageUrl);

      itemMap.set(item, {style, svgPosition, isInspected: false});
      let min;
      let max;
      let modifier;;
      if(item.category === Category.Tech){
        modifier = 1.2/(depth+1)
        min = (sizeOfItems[index+1] + sizeOfItems[index]);
        max = (sizeOfItems[index+1] + sizeOfItems[index]*2.5) * modifier
      }else{
        modifier = (depth*0.9)
        min = (sizeOfItems[index+1] + sizeOfItems[index])/1.4;
        max = (sizeOfItems[index+1] + sizeOfItems[index]) * modifier
      }

/*       modifier = 1/(parentIndex+1)
      min = (sizeOfItems[index+1] + sizeOfItems[index])/1.4;
      max = (sizeOfItems[index+1] + sizeOfItems[index]) * modifier */

      let random = this.randomizer(min, max);
      //start= start + random > item.category + 120 ? (item.category + 120)-itemSize/4 : start + random;
      start+= random;
    }
    return itemMap;
  }

  private calculatePosition(itemSize, start, parentRadius, depth, index, category){
    let isOdd = depth%2 ? 1 : 2
    let isIndexOdd = category === Category.Tech ? index%2 ? 1 : 2 : index%2 ? 2 : 1
    let modifier = isOdd + isIndexOdd;
    let radius = this.randomizer(( itemSize + parentRadius)*(modifier/2), (itemSize + parentRadius))* modifier;
    let posX = (radius * Math.cos(ANGLEINRADIANT * start) + parentRadius) -itemSize/2;
    let posY = (radius * Math.sin(ANGLEINRADIANT * start) + parentRadius) -itemSize/2;
    let svgLine = this.drawSvgLine( itemSize, posX, posY, parentRadius);

    return {itemPos: {'top' : posY+'px', 'left' : posX+'px'}, lineSvg : svgLine};
  }
  private randomizer(min, max){
    return Math.random() * (max - min) + min;
  }
  private calcItemSize(items: MenuItem[]){
    let itemSize = [];
    for(let item of items){
      itemSize.push(ITEMD*(1 + item.percentage/100 + item.itemLevel)/2);
    }
    return itemSize;
  }
  private styleItem(position, size, background){
    return {'top' : position.top, 'left' : position.left, 'width' : size+'px', 'height' : size+'px', 'background-image' : `url('${background}')`}
  }
  public drawSvgLine(size, x, y, parentRadius){
    let proba1 = `M ${parentRadius},${parentRadius} L ${x+size/2}, ${y+size/2}`;
    return proba1;
  }

}

//let proba1 = `M ${parentRadius},${parentRadius} A 5 2 20 0 1 ${x+size/2}, ${y+size/2} Z`;
