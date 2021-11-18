export class Rating{
  constructor(
    public nickName?: string,
    public comment?: string,
    public isCodeChecked?: boolean,
    public isDeveloper?: boolean,
    public design?: number,
    public usability?: number,
    public code: number = null,
    public overall?: number
  ){}
}
