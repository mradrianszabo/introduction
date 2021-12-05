import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Tile, TileInterface } from '../tile/tile';
import { MenuService } from './menu.service';
import { ResolutionService } from './resolution.service';

@Injectable({
  providedIn: 'root'
})
export class TileService {
  private isMobile : boolean;

  constructor(private http : HttpClient, private menuService : MenuService, private router : Router, private resolutionService : ResolutionService) {
    this.resolutionService.getIsMobile().subscribe(data=>this.isMobile = data);
   }

  async getTileList(){
    let raw = await this.http.get<TileInterface[]>('/assets/data/tile-list.json').toPromise();
    return raw.map(elem=> this.convert(elem));
  }

  private convert(raw : TileInterface) : Tile{
    return new Tile(raw.title, raw.imageUrl, raw.description, this.addAction(raw.action), this.addAction(raw?.mobileAction));
  }

  private addAction(action : {type : string, url : string}){
    if(!!action){

      if(action.type === "move"){
        return ()=>{
        this.menuService.emitMenuStatus(true);
        setTimeout(()=>this.router.navigate([`/description/${action.url}`]),500);
      }
    }else if(action.type === "openMenu"){
      return()=>{
        this.menuService.setMenuAsOpened();
      }
    }else{
      return ()=>{
        window.open(action.url, '_blank');
      }
    }
  }else{
    return null;
  }

  }


}
