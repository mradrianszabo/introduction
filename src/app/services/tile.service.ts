import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Tile, TileInterface } from '../tile/tile';
import { MenuService } from './menu.service';
import { ResolutionService } from './resolution.service';

@Injectable({
  providedIn: 'root'
})
export class TileService {

  private tileList$ : ReplaySubject<Tile[]>

  constructor(private http : HttpClient, private menuService : MenuService, private router : Router) {
    this.tileList$ = new ReplaySubject();
    this.http.get<TileInterface[]>('/assets/data/tile-list.json').pipe(map(data=>data.map(elem=>this.convert(elem)))).subscribe(this.tileList$);
   }

  getTileList(){
    return this.tileList$;
  }

  private convert(raw : TileInterface) : Tile{
    return new Tile(raw.title, raw.imageUrl, raw.description, this.addAction(raw.action), this.addAction(raw?.mobileAction));
  }

  private addAction(action : {type : string, url : string}){
    if(!!action){

      if(action.type === "move"){
        return ()=>{
          this.router.navigate([`/description/${action.url}`]);
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
