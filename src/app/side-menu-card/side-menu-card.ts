export class SideMenuCard{
  constructor(
    public title : string,
    public svgString : string,
    public action? : Function,
    public routerLink? : string
  ){}

}
