enum ItemLevel{
  Zero,
  Beginner,
  Advance,
  Expert
}

export class MenuItem{
  constructor(
    public name: string,
    public imageUrl: string,
    public description: string,
    public isOpen: boolean,
    public position: string,
    public itemLevel: number = ItemLevel.Zero,
    public itemPercentage: number = 0,
    public subItems?: MenuItem[],

  ){
    this.itemPercentage = this.percentageRange(this.itemPercentage);
  }

  private percentageRange(percentage: number): number{
    return percentage<0 ? 0 : percentage>100 ? 100 : percentage;
  }

}
