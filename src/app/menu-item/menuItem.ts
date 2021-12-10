export enum ItemLevel{
  Zero,
  Beginner,
  Advance,
  Expert
}

export enum Category{
  Personal = -70,
  Future =  0,
  Tech = 90,
}

export interface MenuItemModel{
  name : string;
  description : string;
  percentage : number;
  itemLevel : number;
  category : number;
  imageUrl?: string;
  isOpen : boolean;
  isInspected : boolean;
  isSelected : boolean;
  subItems : MenuItem[];
  fileUrl?: string;
}
export class MenuItem implements MenuItemModel{
  constructor(
    public name: string,
    public description: string,
    public percentage: number = 0,
    public itemLevel: number = ItemLevel.Zero,
    public category: number,
    public imageUrl?: string,
    public isOpen: boolean = true,
    public isInspected: boolean = false,
    public isSelected: boolean = false,
    public subItems: MenuItem[] = [],
    public fileUrl?: string

  ){
    this.percentage = this.percentageRange(this.percentage);
  }

  private percentageRange(percentage: number): number{
    return percentage<0 ? 0 : percentage>100 ? 100 : percentage;
  }

}
