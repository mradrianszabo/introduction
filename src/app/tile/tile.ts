export interface TileInterface{
  title : string;
  imageUrl : string;
  description : string;
  action : {type : string, url : string},
  mobileAction?: {type : string, url : string}
}

export class Tile {
  constructor(
    public title : string,
    public imageUrl : string,
    public description : string,
    public action : Function,
    public mobileAction?: Function,
  ){}
}
