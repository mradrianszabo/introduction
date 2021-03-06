import { ViewportScroller } from '@angular/common';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SideMenuCard } from '../side-menu-card/side-menu-card';
import { MenuService } from './menu.service';
import { ResolutionService } from './resolution.service';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  public isMobile : boolean;

  constructor(private menuService : MenuService, private router: Router, private resolutionService : ResolutionService, private scroller : ViewportScroller) {
    this.resolutionService.getIsMobile().subscribe(data=>this.isMobile = data);
   }

  public getCards() : SideMenuCard[]{
    let cards = [];
    cards.push(
      new SideMenuCard(
        'Skill map',
        'skillMap',
        ()=>{
          if(this.isMobile){
            //this.router.navigate(['.'], {fragment : 'tileList'});
            this.scroller.scrollToAnchor('tileList');
          }else{
            this.menuService.setMenuAsOpened();
          }
        }
        ),
      new SideMenuCard(
        'Know me',
        'aboutMe',
        ()=>{
          this.router.navigate(['/description/personal']);
        }
      ),
      new SideMenuCard(
        'Rate me',
        'rateMe',
        ()=>{
          setTimeout(()=> this.router.navigate(['/rateMe']),0);

        }
      )
    )
    return cards;
  }

}


